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

## 2. 아키텍처 한눈에 — SEO 단일 소스

이 서버는 단독으로 동작하지 않고 두 개의 단일 소스 파일을 import합니다.

```
apps/web/
├── routes.cjs            ← 라우트 경로 (router/index.tsx와 공유)
│   ├ ROUTES                : 명명 상수 (절대 경로)
│   ├ DESKTOP_PATHS         : /desktop 접두사 URL
│   ├ KNOWN_ROUTE_PATTERNS  : 위에서 derive (soft 404 매칭용)
│   ├ routeToRegex          : `:param` → `[^/]+` 변환
│   └ toChildPath           : 절대 → React Router 자식 경로
│
├── seo.config.cjs        ← SEO 정책 (vite.config.ts와 공유)
│   ├ BASE_URL, DEFAULT_OG_IMAGE, INVITE_OG_IMAGE
│   ├ INDEXABLE_ROUTES        : sitemap dynamicRoutes
│   ├ PRIVATE_ROUTE_PREFIXES  : noindex prefix (sitemap exclude + server noindex 공유)
│   ├ NOINDEX_PATH_PREFIXES   : ↑의 별칭
│   ├ SITEMAP_EXCLUDE         : ↑의 glob 형식
│   └ ROBOTS_DISALLOW_PREFIXES: robots.txt Disallow 패턴
│
├── vite.config.ts        ← seo.config.cjs를 import해 sitemap + robots.txt 자동 생성
├── src/router/index.tsx  ← routes.cjs의 ROUTES를 import해 path 정의
└── server/server.cjs     ← routes.cjs + seo.config.cjs 모두 import (이 파일!)
```

**라우트를 추가/변경할 때 손대는 곳:**
- 새 라우트 추가 → `routes.cjs`의 `ROUTES`에 상수 추가, `router/index.tsx`에 컴포넌트 매핑
- 비공개 페이지 정책 변경 → `seo.config.cjs`의 `PRIVATE_ROUTE_PREFIXES` 1곳

---

## 3. 파일 구조 한눈에

| 섹션 | 역할 |
|---|---|
| 초기화 / 외부 모듈 require | Express + dist 정적 서빙 + 단일 소스 require |
| 복호화 | `/space/join/:id`의 암호화 ID 풀기 |
| 메타 주입기 | `injectMeta()` — 가장 중요한 함수 |
| 라우트 메타 사전 | `STATIC_ROUTE_META` — 공개 페이지 title/desc (이전엔 noindex 엔트리도 있었으나 prefix로 일원화) |
| noindex / canonical 헬퍼 | `resolveRouteMeta`, `getCanonicalUrl`, `isKnownRoute` |
| 캐시 | In-memory FIFO + `Cache-Control` 헤더 |
| 동적 라우트 | `/space/join/:id` — 초대장 OG 이미지 (에러 시 404 fallback) |
| catch-all | 나머지 모든 GET 요청 처리 |
| 진입점 | 로컬 listen + Vercel export |

---

## 4. 섹션별 상세 해부

### 4-1. 초기화 + 단일 소스 require

```js
require('dotenv').config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio"); // 서버사이드 jQuery → HTML 파싱/조작
const axios = require("axios");
const CryptoJS = require("crypto-js");

// SEO 라우트 정책 단일 소스 — vite.config.ts와 공유
const {
  BASE_URL,
  DEFAULT_OG_IMAGE,
  INVITE_OG_IMAGE,
  NOINDEX_PATH_PREFIXES,
} = require("../seo.config.cjs");

// 라우트 정의 단일 소스 — src/router/index.tsx와 공유
const { KNOWN_ROUTE_PATTERNS } = require("../routes.cjs");

const app = express();
const distPath = path.resolve(__dirname, "../dist");
app.use(express.static(distPath));
```

**핵심**:
- `express.static(distPath)`이 먼저 등록되어 있어 정적 자산(JS·CSS·이미지)은 cheerio를 거치지 않고 바로 응답됩니다.
- BASE_URL, 이미지 URL, noindex prefix는 모두 외부 파일에서 import → 이 파일에는 SEO 정책이 하드코딩되어 있지 않습니다.

### 4-2. 복호화

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

스페이스 초대 URL은 raw space ID를 노출하지 않기 위해 AES 암호화된 ID를 씁니다. 서버에서 OG 이미지·제목을 만들려면 이 ID를 풀어서 백엔드 API에 물어봐야 합니다.

### 4-3. ⭐ `injectMeta()` — 이 파일의 심장

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
- `.attr('data-rh', 'true')` — react-helmet-async가 클라이언트에서 SSR 메타를 인식할 때 쓰는 마커. 안 붙이면 React가 마운트되면서 메타가 사라질 수 있음.
- `image`가 옵셔널인 이유: 라우트가 별도 og:image 지정 안 하면 `index.html`의 기본값을 그대로 두려고.
- canonical은 `append`로 항상 새로 추가 (noindex일 땐 추가 안 함 — 신호 혼선 방지).

> **중요**: `index.html`에는 정적 canonical을 두지 **않습니다**. 서버 인젝션과 중복되면 Google이 모든 canonical 신호를 무시합니다. (#847 작업에서 제거 완료)

### 4-4. `STATIC_ROUTE_META` — 공개 페이지 메타 사전

```js
const STATIC_ROUTE_META = {
  "/": { title: "성장하는 당신을 위한…", description: "…", image: DEFAULT_OG_IMAGE },
  "/login": { title: "로그인 | Layer", description: "…", image: DEFAULT_OG_IMAGE },
  "/template": { title: "회고 템플릿 모음 | Layer", /* … */ },
  "/desktop": { /* alias of "/" */ },
  "/desktop/login": { /* alias of "/login" */ },
};
```

**공개 페이지만** 명시합니다. 비공개 페이지는 `NOINDEX_PATH_PREFIXES` (seo.config.cjs)의 prefix 매칭으로 일괄 처리되므로 여기 적을 필요 없습니다. (이전엔 `/myinfo: { noindex: true }` 같은 엔트리가 있었지만 prefix로 일원화)

### 4-5. ⭐ `KNOWN_ROUTE_PATTERNS` — soft 404 방지 (routes.cjs에서 derive)

```js
// 이 서버 파일 안에는 인라인 정규식이 없음.
const { KNOWN_ROUTE_PATTERNS } = require("../routes.cjs");

function isKnownRoute(reqPath) {
  return KNOWN_ROUTE_PATTERNS.some((re) => re.test(reqPath));
}
```

`routes.cjs`가 `ROUTES`와 `DESKTOP_PATHS`의 모든 절대 경로를 `routeToRegex`로 변환한 결과를 export합니다. 라우터(`src/router/index.tsx`)도 같은 `ROUTES` 상수를 사용하므로 **라우트 추가 시 양쪽이 동시에 업데이트**됩니다.

**Soft 404가 뭔가?**

- SPA의 `/asdfasdf` 같은 존재 안 하는 경로에 접근해도 SPA는 보통 200 응답에 "페이지 없음" 컴포넌트를 보여줍니다.
- Google은 이를 "내용은 404 같은데 status가 200이네?" → **soft 404** 페널티 매김.
- 해결: 서버에서 라우터 정의와 비교해 **존재하지 않는 경로면 명시적 404 status**를 반환.

### 4-6. `NOINDEX_PATH_PREFIXES` (seo.config.cjs에서 derive)

```js
const { NOINDEX_PATH_PREFIXES } = require("../seo.config.cjs");

function isNoindexPath(reqPath) {
  return NOINDEX_PATH_PREFIXES.some((prefix) => reqPath.startsWith(prefix));
}

function resolveRouteMeta(reqPath) {
  if (STATIC_ROUTE_META[reqPath]) return STATIC_ROUTE_META[reqPath]; // 정확 매칭 (공개 페이지)
  if (isNoindexPath(reqPath))     return { noindex: true };           // prefix 매칭 (비공개)
  return null;                                                         // 모르는 라우트
}
```

`seo.config.cjs`의 `PRIVATE_ROUTE_PREFIXES`가 동일한 prefix 목록을 sitemap exclude와 noindex 양쪽에서 사용하도록 보장합니다 (단일 소스).

### 4-7. `getCanonicalUrl` — URL 정규화

```js
function getCanonicalUrl(reqPath) {
  let canonicalPath = reqPath.replace(/^\/desktop/, '') || '/';  // /desktop/login → /login
  if (canonicalPath.length > 1 && canonicalPath.endsWith('/')) {
    canonicalPath = canonicalPath.slice(0, -1);                  // /login/ → /login
  }
  return `${BASE_URL}${canonicalPath}`;
}
```

모바일 `/login`과 데스크탑 `/desktop/login`은 같은 콘텐츠 → 둘 다 canonical을 `https://layerapp.io/login`으로 통일해서 **중복 콘텐츠 페널티 방지**.

### 4-8. 캐시

```js
const META_CACHE = new Map();      // FIFO, 최대 100
const META_CACHE_MAX = 100;

function setCacheHeaders(res, kind) {
  if (kind === "static-public") {
    // 공개 페이지: 브라우저 5분, edge(CDN) 1시간, stale-while-revalidate 1일
    res.set('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
  } else if (kind === "static-noindex") {
    // 인증 페이지: 브라우저 캐시 X, edge에서만 1분
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

### 4-9. ⭐ 동적 라우트 `/space/join/:id` — 에러 시 404 fallback

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
    const apiResponse = await axios.get(                                // 2. 백엔드 fetch
      `${process.env.VITE_API_URL}/api/space/public/${decryptedId}`
    );
    const { leader, name: teamName } = apiResponse.data;
    if (!leader?.name || !teamName) throw new Error("Missing data.");

    const result = injectMeta(html, {                                   // 3. 메타 주입
      title: `${leader.name}님의 회고 초대장`,
      description: `함께 회고해요! ${leader.name}님이 ${teamName} 스페이스에 초대했어요.`,
      image: INVITE_OG_IMAGE,
      url: getCanonicalUrl(req.path),
    });

    setCacheHeaders(res, "dynamic");
    res.send(result);
  } catch (err) {
    console.error("Error processing space join page:", err.message);
    // 복호화 실패·백엔드 4xx/5xx → 404 + noindex 메타 + SPA 셸 반환.
    // 봇은 "존재하지 않음"으로 인식해 재시도하지 않고,
    // 사용자는 SPA가 마운트되어 자체 에러 화면을 렌더할 수 있습니다.
    const fallback = injectMeta(html, {
      title: "초대장을 찾을 수 없습니다 | Layer",
      description: "이 회고 초대 링크는 만료되었거나 존재하지 않습니다.",
      image: DEFAULT_OG_IMAGE,
      url: getCanonicalUrl(req.path),
      noindex: true,
    });
    setCacheHeaders(res, "static-noindex");
    return res.status(404).send(fallback);
  }
});
```

**사용자 시나리오 (성공 경로)**

1. 친구가 카톡으로 `https://layerapp.io/space/join/eHl6PT0=` 같은 링크를 공유.
2. 카톡 OG 봇이 이 URL을 GET 요청.
3. 서버는 `eHl6PT0=`를 복호화해 실제 스페이스 ID를 얻고, 백엔드에서 리더·팀 이름을 fetch.
4. `"홍길동님의 회고 초대장"` 같은 개인화된 메타로 HTML을 만들어 응답.
5. 카톡 미리보기에 정확한 정보가 표시됨.

**에러 경로 (복호화 실패 / 백엔드 4xx, 5xx)**

- 이전: `500 "Failed to fetch space data."` raw 텍스트 → 봇이 재시도, SPA 안 뜸.
- 현재: `404` + noindex 메타 + 정상 SPA 셸 → 봇은 영구 부재로 판단, 사용자는 SPA의 자체 에러 UI 확인.

> 이 라우트는 catch-all(`app.get("*")`)보다 먼저 등록되어 있어 `seo.config.cjs`의 `/space` noindex prefix 정책의 **예외**입니다. OG 미리보기를 위해 의도된 설계.

### 4-10. ⭐ Catch-all `app.get("*")`

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

### 4-11. 진입점

```js
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
module.exports = app;  // Vercel Serverless Function이 이 export를 핸들러로 사용
```

**로컬 vs 프로덕션**

- 로컬 `pnpm web start` — 3000번 포트로 실제 listen.
- Vercel — `listen`은 무시되고, `module.exports = app`이 serverless 핸들러로 호출됨. `vercel.json`의 라우팅 룰이 모든 비-정적 요청을 이 함수로 보냄.

---

## 5. 한 요청의 라이프사이클 예시

**사용자가 `/template`에 접속했을 때**

```
브라우저 → Vercel Edge
   ↓
   (정적 파일 아님 → server.cjs로 위임)
   ↓
app.get("*") 진입
   ├ isKnownRoute("/template") → true (ROUTES.TEMPLATE 매칭)
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

## 6. 검증 방법

```bash
cd apps/web
pnpm build && pnpm start

# 1. canonical은 라우트별로 1개만, 정확한 절대 URL
curl -s http://localhost:3000/template | grep -i canonical
# 기대: <link rel="canonical" href="https://layerapp.io/template" data-rh="true" />

# 2. noindex 페이지는 canonical 없음
curl -s http://localhost:3000/myinfo | grep -i canonical
# 기대: 빈 출력

# 3. 존재하지 않는 경로는 명시적 404 status
curl -sI http://localhost:3000/asdf-no-such-page | head -1
# 기대: HTTP/1.1 404 Not Found

# 4. /space/join 에러 시 404 + noindex
curl -sI http://localhost:3000/space/join/invalid-id | head -1
# 기대: HTTP/1.1 404 Not Found

# 5. robots.txt가 seo.config.cjs로부터 자동 생성됐는지
head -3 dist/robots.txt
# 기대: # 자동 생성됨 — 수정 시 apps/web/seo.config.cjs의 ROBOTS_DISALLOW_PREFIXES를 변경하세요.

# 6. sitemap.xml에 공개 라우트 3개 (/ + /login + /template)만 포함
cat dist/sitemap.xml | grep -o '<loc>[^<]*</loc>'
```

---

## 7. 핵심 키워드 정리

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

## 8. 유지보수 시 주의 사항

#847 작업으로 SEO 정책의 동기화 부담이 크게 줄었습니다. 변경 시나리오별 손댈 곳:

### 새 공개 라우트 추가 (e.g. `/about`)
1. `apps/web/routes.cjs` — `ROUTES.ABOUT = "/about"` 추가
2. `apps/web/src/router/index.tsx` — 컴포넌트 매핑 (`path: toChildPath(ROUTES.ABOUT)`)
3. `apps/web/server/server.cjs` — `STATIC_ROUTE_META["/about"]`에 title/description/image 추가
4. (선택) `apps/web/seo.config.cjs` — `INDEXABLE_ROUTES`에 `ROUTES.ABOUT` 추가 (sitemap 노출 시)

### 새 비공개 라우트 추가 (e.g. `/admin`)
1. `apps/web/routes.cjs` — `ROUTES.ADMIN = "/admin"` 추가
2. `apps/web/src/router/index.tsx` — 컴포넌트 매핑
3. `apps/web/seo.config.cjs` — `PRIVATE_ROUTE_PREFIXES`에 `/admin` 추가 (sitemap exclude + server noindex 동시 적용)
4. (선택) `ROBOTS_DISALLOW_PREFIXES`에도 추가 (robots.txt가 빌드 시 자동 갱신)

### 데스크탑 reachable 라우트 추가
- 추가로 `apps/web/routes.cjs`의 `DESKTOP_PATHS`에 `/desktop/...` 형식으로 명시 (router의 deviceType: "desktop" 라우트와 일치)

### 자동화된 부분 (손댈 필요 없음)
- `dist/sitemap.xml` — `vite-plugin-sitemap`이 `seo.config.cjs`에서 자동 생성
- `public/robots.txt` — Vite 빌드 플러그인이 `seo.config.cjs`에서 자동 생성
- `server.cjs`의 `KNOWN_ROUTE_PATTERNS` — `routes.cjs`에서 자동 derive
- `seo.config.cjs`의 `INDEXABLE_ROUTES` — `routes.cjs`의 `ROUTES`에서 derive

### 남은 수동 동기화 포인트
- `routes.cjs`의 `DESKTOP_PATHS`와 `router/index.tsx`의 `deviceType: "desktop"` 라우트 정의
- 라우터의 `lazy()` 컴포넌트 매핑 자체

장기 개선 후보 — router 정의를 routes.cjs로 합치고 `lazy()` 매핑을 컨벤션 기반으로 자동화하면 단일 소스가 완성됨.
