# `apps/web/server/server.cjs` 완벽 가이드

> SPA의 SEO 한계를 보완하기 위해 라우트별 메타 태그를 동적으로 주입하고, soft 404를 막고, 캐시 정책을 잘게 적용하는 SEO 미들레이어.

---

## 0. 한 문장 요약

이 파일은 **"SPA의 빈 HTML을 크롤러가 만나기 전에, 라우트별로 적절한 SEO 메타 태그를 주입해서 돌려주는 Express 서버"** 입니다.

`.cjs` 확장자 = CommonJS 모듈. 프로젝트 전체는 ESM이지만 Vercel Serverless Function이 CommonJS 진입점을 요구해서 이 파일만 `.cjs`입니다.

---

## 1. 왜 이런 서버가 필요한가?

### 일반 SPA의 SEO 문제

Vite로 빌드한 SPA는 `dist/index.html` 하나가 모든 경로의 응답입니다.

```html
<title>성장하는 당신을 위한 회고 서비스, Layer</title>
<meta name="description" content="…기본 설명…" />
<div id="root"></div>
<script src="/src/app.tsx"></script>  <!-- 여기서 React가 라우팅 -->
```

문제는

1. **크롤러는 JS를 즉시 실행하지 않습니다.** Googlebot은 일부 실행하지만 카카오톡 / 페이스북 / X(Twitter) OG 미리보기 봇은 거의 실행하지 않습니다.
2. 결과: `/template`을 카톡으로 공유해도 **루트 페이지의 메타**(`성장하는 당신을…`)가 보이고, 라우트별 description/og:image가 반영되지 않습니다.
3. Google 입장에서도 모든 라우트의 메타가 동일 → 인덱싱 품질 저하.

### 이 파일의 해법

요청이 들어오면

1. `dist/index.html` (빈 SPA 셸)을 읽고
2. 요청 경로(`req.path`)를 보고 라우트별 메타를 결정한 뒤
3. cheerio로 HTML을 파싱해서 `<title>`, `<meta>`, `<link rel="canonical">`을 **갈아끼우고**
4. 수정된 HTML을 응답 → 크롤러는 라우트에 맞는 메타를 봅니다.

React는 브라우저에서 평소처럼 실행되므로 사용자 경험은 그대로입니다.

---

## 2. 파일 구조 한눈에

| 섹션 | 행 번호 | 역할 |
|---|---|---|
| 초기화 | 1–14 | Express + dist 정적 서빙 |
| 복호화 | 16–32 | `/space/join/:id`의 암호화 ID 풀기 |
| 상수 | 34–36 | 도메인, OG 이미지 URL |
| 메타 주입기 | 50–79 | `injectMeta()` — 가장 중요한 함수 |
| 라우트 메타 사전 | 86–127 | `STATIC_ROUTE_META` — 경로별 title/desc |
| 라우트 화이트리스트 | 135–163 | `KNOWN_ROUTE_PATTERNS` — soft 404 방지 |
| noindex 정책 | 165–217 | 어떤 경로를 검색엔진에서 숨길지 |
| 캐시 | 224–249 | 메모리 캐시 + `Cache-Control` 헤더 |
| 동적 라우트 | 251–287 | `/space/join/:id` — 초대장 OG 이미지 |
| catch-all | 289–335 | 나머지 모든 GET 요청 처리 |
| 진입점 | 337–342 | 로컬 listen + Vercel export |

---

## 3. 섹션별 상세 해부

### 3-1. 초기화 (1–14행)

```js
require('dotenv').config();         // .env 파일 로드 (CRYPTO_KEY 등)
const express = require("express");
const fs = require("fs");           // index.html 읽기
const path = require("path");
const cheerio = require("cheerio"); // 서버사이드 jQuery → HTML 파싱/조작
const axios = require("axios");     // 백엔드 API 호출 (스페이스 정보 가져오기)
const CryptoJS = require("crypto-js"); // AES 복호화

const app = express();
const distPath = path.resolve(__dirname, "../dist");  // Vite 빌드 결과물 위치
app.use(express.static(distPath));  // /favicon.ico, /assets/*.js 등 정적 파일 먼저 매칭
```

**핵심**: `express.static(distPath)`이 먼저 등록되어 있어 정적 자산(JS·CSS·이미지)은 cheerio를 거치지 않고 바로 응답됩니다. cheerio는 HTML 요청에만 동작합니다.

### 3-2. 복호화 (16–32행)

```js
function decryptId(encryptedId) {
  // /space/join/abc123== 같은 URL의 abc123== 부분을 풀어 실제 space ID 추출
  const word_array = CryptoJS.enc.Base64.parse(encryptedId);
  const decoding = word_array.toString(CryptoJS.enc.Utf8);
  const decrypted = CryptoJS.AES.decrypt(decoding, key, {
    iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
```

**왜 필요한가?** 스페이스 초대 URL은 raw space ID를 노출하지 않기 위해 AES 암호화된 ID를 씁니다. 서버에서 OG 이미지·제목을 만들려면 이 ID를 풀어서 백엔드 API에 물어봐야 합니다.

### 3-3. ⭐ `injectMeta()` — 이 파일의 심장 (50–79행)

```js
function injectMeta(html, { title, description, image, url, noindex }) {
  const $ = cheerio.load(html);  // jQuery 같은 API로 HTML 조작 가능

  $('title').text(title);
  $('meta[name="description"]').attr('content', description).attr('data-rh', 'true');
  $('meta[property="og:title"]').attr('content', title).attr('data-rh', 'true');
  $('meta[property="og:description"]').attr('content', description).attr('data-rh', 'true');
  $('meta[property="og:url"]').attr('content', url).attr('data-rh', 'true');
  if (image) {
    $('meta[property="og:image"]').attr('content', image).attr('data-rh', 'true');
  }
  $('meta[name="twitter:title"]').attr('content', title).attr('data-rh', 'true');
  $('meta[name="twitter:description"]').attr('content', description).attr('data-rh', 'true');
  if (image) {
    $('meta[name="twitter:image"]').attr('content', image).attr('data-rh', 'true');
  }

  $('meta[name="robots"]').attr(
    'content',
    noindex ? 'noindex, nofollow' : 'index, follow'
  ).attr('data-rh', 'true');

  if (!noindex) {
    $('head').append(`<link rel="canonical" href="${url}" data-rh="true" />`);
  }

  return $.html();
}
```

**라인별 해설**

- `cheerio.load(html)` — HTML 문자열을 DOM 트리로 파싱. `$`는 jQuery API와 동일.
- `$('title').text(title)` — `<title>` 텍스트 교체.
- `.attr('content', …)` — 메타 태그의 `content` 속성 갱신.
- `.attr('data-rh', 'true')` — react-helmet-async가 클라이언트에서 SSR 메타를 인식할 때 쓰는 마커. 안 붙이면 React가 마운트되면서 메타가 사라질 수 있음.
- `image`가 옵셔널인 이유: 라우트가 별도 og:image 지정 안 하면 `index.html`의 기본값(`og-image.png`)을 그대로 두려고.
- `noindex ? 'noindex, nofollow' : 'index, follow'` — 검색엔진에 "이 페이지 색인하지 마 / 링크 따라가지 마"를 알리는 표준 메타.
- canonical은 `append`로 항상 새로 추가 (noindex일 땐 추가 안 함 — 신호 혼선 방지).
- `$.html()` — 변경된 DOM을 다시 HTML 문자열로 직렬화.

> **Note**: `index.html`에는 정적 canonical을 두지 않습니다. 서버 인젝션과 중복되어 Google이 모든 canonical 신호를 무시하는 문제가 생깁니다.

### 3-4. `STATIC_ROUTE_META` — 라우트별 메타 사전 (86–127행)

```js
const STATIC_ROUTE_META = {
  "/": { title: "성장하는 당신을 위한…", description: "…", image: DEFAULT_OG_IMAGE },
  "/login": { title: "로그인 | Layer", description: "…", image: DEFAULT_OG_IMAGE },
  "/template": { title: "회고 템플릿 모음 | Layer", /* … */ },
  // …
  "/myinfo": { noindex: true },  // 개인 페이지는 메타도 의미 없고 인덱싱 차단
  "/write":  { noindex: true },
  // …
};
```

경로 → 메타 매핑. 공개 페이지엔 title/desc/image를, 개인 페이지엔 `noindex: true`만 표시. catch-all에서 이 사전을 lookup해서 응답을 만듭니다.

### 3-5. ⭐ `KNOWN_ROUTE_PATTERNS` — soft 404 방지 (135–163행)

```js
const KNOWN_ROUTE_PATTERNS = [
  /^\/$/,
  /^\/login$/,
  /^\/template$/,
  /^\/space\/[^/]+(\/(templates|members(\/edit)?))?$/,  // 동적 ID 포함
  /^\/retrospect\/(new|complete|analysis)$/,
  // …
];

function isKnownRoute(reqPath) {
  return KNOWN_ROUTE_PATTERNS.some((re) => re.test(reqPath));
}
```

**Soft 404가 뭔가?**

- SPA의 `/asdfasdf` 같은 존재 안 하는 경로에 접근해도 SPA는 보통 200 응답에 "페이지 없음" 컴포넌트를 보여줍니다.
- Google은 이를 "내용은 404 같은데 status가 200이네?" → **soft 404** 페널티 매김.
- 해결: 서버에서 라우터 정의와 비교해 **존재하지 않는 경로면 명시적 404 status**를 반환.

### 3-6. `NOINDEX_PATH_PREFIXES`와 `isNoindexPath` (165–217행)

```js
const NOINDEX_PATH_PREFIXES = ["/myinfo/", "/write/", "/api/", "/desktop/myinfo", /* … */];

function isNoindexPath(reqPath) {
  return NOINDEX_PATH_PREFIXES.some((prefix) => reqPath.startsWith(prefix));
}

function resolveRouteMeta(reqPath) {
  if (STATIC_ROUTE_META[reqPath]) return STATIC_ROUTE_META[reqPath];  // 정의된 라우트
  if (isNoindexPath(reqPath))   return { noindex: true };             // prefix 매칭
  return null;                                                         // 모르는 라우트
}
```

`STATIC_ROUTE_META`는 **정확한 경로 매칭**이고, `NOINDEX_PATH_PREFIXES`는 **prefix 매칭**입니다. 예를 들어 `/myinfo`는 STATIC_ROUTE_META에, `/myinfo/modify`는 prefix `/myinfo/`에 잡힙니다.

### 3-7. `getCanonicalUrl` — URL 정규화 (196–203행)

```js
function getCanonicalUrl(reqPath) {
  let canonicalPath = reqPath.replace(/^\/desktop/, '') || '/';  // /desktop/login → /login
  if (canonicalPath.length > 1 && canonicalPath.endsWith('/')) {
    canonicalPath = canonicalPath.slice(0, -1);                  // /login/ → /login
  }
  return `${BASE_URL}${canonicalPath}`;
}
```

**왜?** 모바일 `/login`과 데스크탑 `/desktop/login`은 같은 콘텐츠 → 둘 다 canonical을 `https://layerapp.io/login`으로 통일해서 **중복 콘텐츠 페널티 방지**.

### 3-8. 캐시 (224–249행)

```js
const META_CACHE = new Map();      // 메모리 LRU (정확히는 FIFO, 최대 100)
const META_CACHE_MAX = 100;

function setMetaCache(key, value) {
  if (META_CACHE.size >= META_CACHE_MAX) {
    const firstKey = META_CACHE.keys().next().value;
    META_CACHE.delete(firstKey);
  }
  META_CACHE.set(key, value);
}

function setCacheHeaders(res, kind) {
  if (kind === "static-public") {
    // 공개 페이지: 브라우저 5분, edge(CDN) 1시간, stale-while-revalidate 1일
    res.set('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
  } else if (kind === "static-noindex") {
    // 인증 페이지: 브라우저 캐시 X, edge에서만 1분 (DDoS 완화 목적)
    res.set('Cache-Control', 'public, max-age=0, s-maxage=60');
  } else {
    // 동적(/space/join/:id): edge 5분
    res.set('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=600');
  }
}
```

**2-tier 캐시**

1. **In-memory** — cheerio 파싱은 CPU 비용이 있어 결과 HTML 자체를 메모리에 저장.
2. **HTTP 헤더** — Vercel Edge CDN과 사용자 브라우저가 우리 응답을 얼마나 저장할지 지시.

### 3-9. ⭐ 동적 라우트 `/space/join/:id` (251–287행)

```js
app.get("/space/join/:id", async (req, res) => {
  const encryptedId = req.params.id;
  let html;

  try { html = readIndexHtml(); }
  catch (err) {
    console.error("Failed to read index.html:", err);
    return res.status(500).send("Error loading the page.");
  }

  try {
    const decryptedId = decryptId(encryptedId);                        // 1. 복호화
    const apiResponse = await axios.get(                                // 2. 백엔드에서 스페이스 정보
      `${process.env.VITE_API_URL}/api/space/public/${decryptedId}`
    );
    const spaceData = apiResponse.data;
    const leaderName = spaceData?.leader?.name;
    const teamName = spaceData?.name;

    if (!leaderName || !teamName) throw new Error("Missing leaderName or teamName.");

    const result = injectMeta(html, {                                   // 3. 메타 주입
      title: `${leaderName}님의 회고 초대장`,
      description: `함께 회고해요! ${leaderName}님이 ${teamName} 스페이스에 초대했어요.`,
      image: INVITE_OG_IMAGE,
      url: getCanonicalUrl(req.path),
    });

    setCacheHeaders(res, "dynamic");
    res.send(result);
  } catch (err) {
    console.error("Error processing space join page:", err.message);
    return res.status(500).send("Failed to fetch space data.");
  }
});
```

**사용자 시나리오**

1. 친구가 카톡으로 `https://layerapp.io/space/join/eHl6PT0=` 같은 링크를 공유.
2. 카톡 OG 봇이 이 URL을 GET 요청.
3. 서버는 `eHl6PT0=`를 복호화해 실제 스페이스 ID를 얻고, 백엔드에서 리더 이름 · 팀 이름을 fetch.
4. `"홍길동님의 회고 초대장"` 같은 개인화된 메타로 HTML을 만들어 응답.
5. 카톡 미리보기에 정확한 정보가 표시됨.

### 3-10. ⭐ Catch-all `app.get("*")` (289–335행)

```js
app.get("*", (req, res) => {
  try {
    const knownRoute = isKnownRoute(req.path);
    const routeMeta = resolveRouteMeta(req.path);
    const isNoindex = !!routeMeta?.noindex || !knownRoute;   // 모르는 경로는 무조건 noindex
    const cacheKind = isNoindex ? "static-noindex" : "static-public";
    const cacheKey = knownRoute ? req.path : "__not_found__";

    // ── 캐시 히트 시 즉시 응답 ──
    if (knownRoute && META_CACHE.has(cacheKey)) {
      setCacheHeaders(res, cacheKind);
      return res.send(META_CACHE.get(cacheKey));
    }

    const html = readIndexHtml();
    const canonicalUrl = getCanonicalUrl(req.path);

    // ── 3분기로 메타 결정 ──
    let meta;
    if (!knownRoute) {
      // (1) 존재하지 않는 경로 → 404
      meta = { title: "페이지를 찾을 수 없습니다 | Layer", /* … */ noindex: true };
    } else if (isNoindex) {
      // (2) 정의됐지만 인덱싱 차단해야 하는 경로
      meta = { ...DEFAULT_META, ...routeMeta, url: canonicalUrl, noindex: true };
    } else {
      // (3) 공개 페이지
      meta = { ...DEFAULT_META, ...(routeMeta || {}), url: canonicalUrl };
    }

    const result = injectMeta(html, meta);

    if (knownRoute) setMetaCache(cacheKey, result);  // 캐시 적중률 위해 알려진 경로만 저장
    setCacheHeaders(res, cacheKind);
    res.status(knownRoute ? 200 : 404).send(result);  // ⭐ soft 404 방지 핵심
  } catch (err) {
    console.error("Error serving page:", err);
    const filePath = path.join(distPath, "index.html");
    res.sendFile(filePath);  // 인젝션 실패해도 최소한 SPA는 띄움
  }
});
```

**판단 로직**

| 라우트 상태 | status | 메타 | 캐시 |
|---|---|---|---|
| `KNOWN_ROUTE_PATTERNS`에 있음 + STATIC에 등록 | 200 | 등록된 title/desc | static-public |
| `KNOWN_ROUTE_PATTERNS`에 있음 + noindex prefix | 200 | DEFAULT + noindex | static-noindex |
| `KNOWN_ROUTE_PATTERNS`에 없음 | **404** | 404 메타 + noindex | static-noindex (`__not_found__` 키) |

### 3-11. 진입점 (337–342행)

```js
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
module.exports = app;  // Vercel Serverless Function이 이 export를 핸들러로 사용
```

**로컬 vs 프로덕션**

- 로컬 `pnpm web start` — 3000번 포트로 실제 listen.
- Vercel — `listen`은 무시되고, `module.exports = app`이 serverless 핸들러로 호출됨. `vercel.json`의 라우팅 룰이 모든 비-정적 요청을 이 함수로 보냄.

---

## 4. 한 요청의 라이프사이클 예시

**사용자가 `/template`에 접속했을 때**

```
브라우저 → Vercel Edge
   ↓
   (정적 파일 아님 → server.cjs로 위임)
   ↓
app.get("*") 진입
   ├ isKnownRoute("/template") → true (/^\/template$/ 매칭)
   ├ resolveRouteMeta("/template") → STATIC_ROUTE_META["/template"]
   ├ isNoindex → false
   ├ META_CACHE.has("/template") ?
   │     ├ YES → 캐시된 HTML 반환 (끝)
   │     └ NO  → 계속
   ├ readIndexHtml() → dist/index.html 읽음
   ├ getCanonicalUrl("/template") → "https://layerapp.io/template"
   ├ meta = { title: "회고 템플릿 모음…", description: "…", image: …, url: "…/template" }
   ├ injectMeta(html, meta)
   │     ├ cheerio.load(html)
   │     ├ <title>, <meta>들 업데이트
   │     ├ <link rel="canonical" href="https://layerapp.io/template" /> 추가
   │     └ $.html()로 직렬화
   ├ META_CACHE에 저장
   ├ Cache-Control: public, max-age=300, s-maxage=3600, …
   └ res.status(200).send(html)
   ↓
브라우저: 메타 적용된 HTML 수신 → React 마운트 → SPA 정상 동작
크롤러:   메타만 읽고 종료 → 라우트별 정확한 정보로 인덱싱
```

---

## 5. 검증 방법

`index.html`의 정적 canonical을 제거한 뒤(옵션 A 수정) 다음과 같이 확인할 수 있습니다.

```bash
# 로컬에서:
pnpm web build && pnpm web start

curl -s http://localhost:3000/template | grep -i canonical
# 기대 출력: <link rel="canonical" href="https://layerapp.io/template" data-rh="true" />  (1개만)

curl -s http://localhost:3000/myinfo | grep -i canonical
# 기대 출력: 없음 (noindex 페이지)

curl -sI http://localhost:3000/asdf-no-such-page | head -1
# 기대 출력: HTTP/1.1 404 Not Found
```

`grep`이 한 줄만 출력하면 옵션 A 수정이 정상 적용된 것이고, canonical 중복이 해결됐다는 의미입니다.

---

## 6. 핵심 키워드 정리

| 용어 | 의미 |
|---|---|
| **cheerio** | 서버에서 jQuery처럼 HTML을 파싱·수정 |
| **injectMeta** | 빈 SPA HTML에 라우트별 메타를 주입하는 함수 |
| **canonical** | "이 URL이 정식 주소" 신호 → 중복 콘텐츠 방지 |
| **noindex** | "검색엔진아 이 페이지 색인하지 마" |
| **soft 404** | 200으로 응답하지만 내용은 없는 페이지 → Google 페널티 |
| **data-rh="true"** | react-helmet-async가 SSR 메타를 인식하는 마커 |
| **stale-while-revalidate** | "캐시는 만료됐지만 일단 보여주고 백그라운드에서 갱신" |
| **Vercel Serverless Function** | 요청마다 임시 인스턴스가 뜨는 서버리스 함수 |

---

## 7. 유지보수 시 주의 사항

라우트를 추가 / 변경 / 삭제할 때 **다음 4곳을 함께 갱신**해야 정합성이 유지됩니다.

1. `apps/web/src/router/index.tsx` — 실제 React Router 정의
2. `apps/web/server/server.cjs` — `STATIC_ROUTE_META`, `KNOWN_ROUTE_PATTERNS`, `NOINDEX_PATH_PREFIXES`
3. `apps/web/public/robots.txt` — 크롤러 차단 경로
4. `apps/web/vite.config.ts` — Sitemap 플러그인의 `dynamicRoutes` / `exclude`

이 중 하나라도 빠지면

- 사용자는 정상이지만 크롤러가 잘못된 메타를 봄
- 또는 존재하는 라우트가 404로 잘못 분류됨
- 또는 비공개 페이지가 검색에 노출됨

장기적으로는 단일 진실 소스(예: 공통 상수 모듈)에서 import하도록 리팩토링하는 것을 권장합니다.
