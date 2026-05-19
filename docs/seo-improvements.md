# #847 SEO 검토 및 개선 — 변경 사항 및 근거 정리

> **브랜치**: `847-ops-seo-검토-및-개선`
> **이슈**: #847
> **범위**: `apps/web/` SEO 인프라 전반 (메타 태그, 라우팅, 캐싱, 단일 소스, 문서화)

---

## 0. 개요

### 문제 의식

Layer는 React SPA로 빌드되어 `dist/index.html` 한 장이 모든 라우트의 응답이 됩니다. 이 구조에서 발생하는 4가지 SEO 한계:

1. **메타 정적화**: 모든 라우트가 같은 title·description·OG 이미지를 보여줌 → 카카오톡/페이스북 공유 미리보기가 항상 홈페이지 메타
2. **Soft 404**: 존재하지 않는 URL도 200 응답에 SPA 셸을 돌려줌 → Google이 페널티
3. **canonical 중복**: 정적 HTML의 canonical과 도메인 통일 의도가 불일치
4. **접근성**: 이미지 alt 누락, viewport `maximum-scale=1.0`로 WCAG 1.4.4 위반

### 작업의 흐름

총 7개 커밋으로 진행되었고 크게 **2단계**로 나뉩니다:

1. **1단계 — 인프라 구축** (eddb684d, f4faa5a6, a9e40237, 8d65efd4): 서버사이드 메타 인젝션, robots/sitemap 정밀 제어, 접근성 회귀 방지
2. **2단계 — 리뷰 피드백 반영** (391e256d, c9fcccb0, 01ef9117 + 미커밋 변경): canonical 중복 해결, DRY 위반 제거, 단일 소스 아키텍처, `/space/join` 회복탄력성

---

## 1. 메타 태그 인프라 — 서버사이드 인젝션

### 1-1. Express 메타 인젝션 서버 (`server.cjs`)

**무엇** — `apps/web/server/server.cjs` 신설. 모든 HTML 요청을 가로채 cheerio로 라우트별 `<title>`, `<meta>`, `<link rel="canonical">`을 동적으로 갈아끼움.

**왜** — 크롤러(특히 카카오톡·페이스북 OG 봇)는 JS를 거의 실행하지 않으므로 React가 렌더한 메타를 못 봄. 빌드 시점에 라우트별 HTML을 만들 수 없는 SPA의 한계를 서버 응답 가공으로 보완.

**어떻게**
- `cheerio.load(html)`로 DOM 파싱 → `.attr()`로 메타 갱신 → `$.html()`로 직렬화
- react-helmet-async 충돌 방지를 위해 `data-rh="true"` 마커 부착
- 인메모리 FIFO 캐시(최대 100) + 3-tier `Cache-Control` 헤더 (`static-public` / `static-noindex` / `dynamic`)

**영향** — 같은 URL이라도 라우트별 정확한 미리보기, Lighthouse SEO 점수 개선, 크롤 예산 절약.

### 1-2. 동적 라우트 메타 (`/space/join/:id`)

**무엇** — 스페이스 초대 링크가 catch-all보다 먼저 매칭되는 전용 핸들러를 가짐. 암호화된 ID를 AES 복호화 → 백엔드 API에서 리더·팀 이름 fetch → `"{leader}님의 회고 초대장"` 등 개인화된 OG 메타 주입.

**왜** — 카카오톡으로 초대 링크를 공유했을 때 일반 메타가 아닌 **누가 어느 스페이스로 초대했는지**가 보여야 클릭률이 오름. 단순 메타 매핑으로는 dynamic 파라미터 처리가 불가능.

**어떻게** — `vercel.json`의 라우팅 룰이 `/space/join/*`를 server.cjs로 위임, server.cjs는 `app.get("/space/join/:id")`로 catch-all 이전에 매칭.

**영향** — 초대 링크 미리보기가 일반 OG 이미지 대신 초대장 전용 이미지(`INVITE_OG_IMAGE`)와 동적 텍스트로 표시.

---

## 2. URL 정규화 — Canonical 및 도메인 통일

### 2-1. `www` → 루트 도메인 통일 (eddb684d)

**무엇** — `www.layerapp.io`를 제거하고 모든 OG URL·canonical·sitemap을 `layerapp.io`로 통일. 중복 OG/Twitter 메타 태그 제거. Kakao SDK 중복 로드 제거.

**왜** — 같은 콘텐츠가 두 도메인으로 인덱싱되면 link equity가 분산되고 중복 콘텐츠 페널티. Kakao SDK 중복 로드는 단순 성능 낭비.

**영향** — Google이 정식 도메인 신호를 일관되게 받음. SDK 로드 1회로 줄어 초기 페이로드 감소.

### 2-2. Canonical 중복 제거 (391e256d, 이 세션)

**무엇** — `apps/web/index.html`에 박혀 있던 정적 `<link rel="canonical" href="https://www.layerapp.io/" />` 한 줄 삭제. server.cjs의 동적 인젝션이 단독 소스가 됨.

**왜** — 1차 작업 후에도 정적 canonical이 남아 있어 모든 응답에 **canonical 태그가 2개**(정적 `www/` + 동적 라우트별) 노출되는 버그. Google은 다수 canonical을 만나면 [전부 무시](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)하므로 1차 작업의 정성스러운 라우트별 canonical이 무력화되어 있었음.

**근거** — `curl -s https://layerapp.io/template | grep canonical`로 노출 확인. www 도메인 통일 커밋(eddb684d) 의도와도 모순.

**영향** — 라우트별 canonical 신호가 정상 작동 → 인덱싱 품질 회복.

---

## 3. 인덱싱 정책 — Sitemap, Robots, Noindex 일관성

### 3-1. Sitemap 정밀 제어 (f4faa5a6, a9e40237)

**무엇** — `vite-plugin-sitemap` 설정을 한 줄 호출에서 정식 설정으로 확장:
- `dynamicRoutes: ["/login", "/template"]` — SPA 라우트 명시 노출
- `exclude` 14개 — 비공개 페이지 제외 (`/desktop/**` 포함, canonical 통일과 짝)
- `changefreq: weekly`, `priority: 0.8`, `lastmod: new Date()` — 네이버·다음 등 비-Google 크롤러용 신호
- `generateRobotsTxt: false` — 손으로 관리하는 robots.txt 덮어쓰기 방지

**왜** — 기본 호출은 정적 페이지만 수집하므로 SPA의 React Router 정의 라우트는 sitemap에 포함되지 않음. 또한 데스크탑·모바일 중복 콘텐츠가 sitemap에 함께 들어가면 정규화 신호가 깨짐.

**영향** — Google Search Console에서 의도한 3개 라우트만 indexable로 노출.

### 3-2. Robots.txt 자동 생성 (01ef9117, 이 세션)

**무엇** — Vite 플러그인 `generateRobotsTxt`가 빌드/dev 시작 시 `seo.config.cjs`의 `ROBOTS_DISALLOW_PREFIXES`로부터 `public/robots.txt`를 자동 생성.

**왜** — 1차 작업의 sitemap exclude·noindex prefix·robots Disallow 3곳이 손동기화되어 있어 라우트 추가 시 누락 가능성. 정적 파일이라 import 불가하므로 빌드 시점에 단일 소스에서 생성.

**핵심 설계** — `PRIVATE_ROUTE_PREFIXES`(noindex용)와 `ROBOTS_DISALLOW_PREFIXES`(robots용)를 **별도로 관리**.
- robots Disallow는 크롤링 자체 차단 (강함) — `/space/join/:id` 같은 OG 미리보기가 필요한 경로는 막으면 안 됨
- noindex 메타는 색인만 차단 (약함) — `/space/[id]` 같은 sub-route는 크롤 허용 + noindex로 충분

**영향** — 동기화 부담 3곳 → 1곳(`seo.config.cjs`).

### 3-3. `/space/[id]` Noindex 누락 보강 (c9fcccb0)

**무엇** — `PRIVATE_ROUTE_PREFIXES`에 `/space` 추가. `/space/:id`(인증 필요한 스페이스 조회)와 모든 sub-route가 noindex 처리됨. `/space/join/:id`는 별도 핸들러가 catch-all 이전에 등록되어 정책 우회.

**왜** — 1차 작업의 `/space/edit/`, `/space/create/`는 명시했지만 `/space/:id`는 빠져 있어 private한 스페이스 콘텐츠가 인덱싱될 위험.

**영향** — 모든 인증 필수 페이지가 일관되게 검색에서 제외.

---

## 4. 접근성 + 성능 (8d65efd4)

### 4-1. Viewport pinch-to-zoom 복원

**무엇** — `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />` → `maximum-scale=1.0, user-scalable=0` 제거.

**왜** — WCAG 1.4.4(텍스트 크기 조정 200%) 위반. 시력 약한 사용자가 확대를 못 함. 특정 화면에서 확대를 막아야 한다면 JS로 페이지 단위 동적 제어 권장.

**근거** — 코드에 WCAG 1.4.4 주석으로 의도 명시 — 무지로 인한 회귀를 방지.

### 4-2. 이미지 `alt` + 로딩 최적화

**무엇** — 다수 `<img>`에 `alt` 텍스트 + `width/height` + `loading="eager"/lazy"` + `decoding="async"` 부여.

**왜**
- `alt`: 접근성(스크린 리더) + Google 이미지 검색 신호
- `width/height`: CLS(Cumulative Layout Shift) 방지
- `loading="lazy"`: 뷰포트 밖 이미지 지연 로딩으로 초기 LCP 개선
- `decoding="async"`: 메인 스레드 블로킹 감소

**영향** — Lighthouse 접근성·성능 점수 동시 개선.

### 4-3. 구조화 데이터 (JSON-LD)

**무엇** — `index.html`의 `<script type="application/ld+json">`에 Organization + WebSite + SoftwareApplication 스키마를 `@graph`로 연결.

**왜** — Google 리치 결과(브랜드 정보 카드, 사이트 검색박스 등) 적격성 확보. SoftwareApplication 표기로 무료 앱임을 명시.

**영향** — Rich Results Test 통과 시 SERP에서 시각적 차별화.

---

## 5. 단일 소스 아키텍처 — DRY 위반 제거 (c9fcccb0 + 이 세션)

이 섹션은 1차 작업 리뷰에서 가장 큰 개선 항목으로 지적된 부분입니다.

### 5-1. `seo.config.cjs` — SEO 정책 단일 소스

**무엇** — `apps/web/seo.config.cjs` 신설. `vite.config.ts`와 `server.cjs`가 공유하는 SEO 정책을 한 곳에 모음.

```
exports:
  BASE_URL, DEFAULT_OG_IMAGE, INVITE_OG_IMAGE
  INDEXABLE_ROUTES          (sitemap dynamicRoutes)
  PRIVATE_ROUTE_PREFIXES    (sitemap exclude + server noindex 공유)
  NOINDEX_PATH_PREFIXES     (위의 별칭)
  SITEMAP_EXCLUDE           (glob 형식으로 변환)
  ROBOTS_DISALLOW_PREFIXES  (robots.txt 별도 정책)
```

**왜** — 1차 작업 후 동일 정책이 4곳에 분산:
- `vite.config.ts` Sitemap `exclude`
- `server.cjs` `NOINDEX_PATH_PREFIXES`
- `server.cjs` `STATIC_ROUTE_META`의 noindex 엔트리
- `public/robots.txt`

라우트 하나 추가하려면 4번 손대야 했고 누락 시 신호 불일치로 인덱싱 결정이 흐려짐.

**어떻게** — `vite.config.ts`와 `server.cjs` 양쪽에서 `require("./seo.config.cjs")`로 import. ESM `import`/CJS `require` interop은 Vite의 esbuild가 자동 처리.

**영향** — 변경 시나리오별 손댈 곳이 1~2곳으로 축소. `server.cjs`의 중복 noindex 엔트리 10개 제거.

### 5-2. `routes.cjs` — 라우트 경로 단일 소스 (이 세션)

**무엇** — `apps/web/routes.cjs` 신설. 모든 라우트 path를 명명 상수로 export하고 `KNOWN_ROUTE_PATTERNS`(soft 404 매칭용 정규식)를 자동 derive.

```
exports:
  ROUTES                  : 38개 명명 상수 (절대 경로, `/login`, `/space/:spaceId` 등)
  DESKTOP_PATHS           : 7개 데스크탑 전용 URL
  KNOWN_ROUTE_PATTERNS    : 위 두 목록을 routeToRegex로 변환한 정규식 배열
  routeToRegex            : React Router :param → [^/]+ 변환
  toChildPath             : 절대 경로 → React Router 자식 경로 (앞 슬래시 제거)
```

**왜** — 1차 작업 리뷰에서 가장 마지막에 남은 동기화 부담. 라우터(`router/index.tsx`)에 새 경로를 추가하면 `server.cjs`의 22행짜리 정규식 배열도 함께 갱신해야 했음 → 누락 시 멀쩡한 페이지가 soft 404로 분류됨.

**어떻게**
1. `routes.cjs`가 절대 경로의 ROUTES 상수와 DESKTOP_PATHS를 export
2. `KNOWN_ROUTE_PATTERNS = ALL_ABSOLUTE_PATHS.map(routeToRegex)`로 자동 derive
3. `router/index.tsx`의 47곳 inline path 문자열을 `toChildPath(ROUTES.X)`로 교체
4. `server.cjs`는 `require("../routes.cjs")`로 KNOWN_ROUTE_PATTERNS import
5. `seo.config.cjs`도 `INDEXABLE_ROUTES`를 `[ROUTES.LOGIN, ROUTES.TEMPLATE]`로 derive

**의도적 minor 동작 변화** — `/retrospect/write`(모바일 컨텍스트): 이전 404 → 이제 200 + noindex 메타. `ROUTES.RETROSPECT_WRITE`를 단일 상수로 추가하면서 ALL_ABSOLUTE_PATHS에 포함됨. noindex 메타가 적용되어 SEO상 무차이.

**영향** — 라우트 추가 시 손댈 곳이 `routes.cjs` + `router/index.tsx` 2곳으로 축소. KNOWN_ROUTE_PATTERNS 손편집 0회.

### 5-3. `toRelative` → `toChildPath` 명명 개선 (이 세션)

**무엇** — 헬퍼 함수 이름을 `toRelative`에서 `toChildPath`로 변경 + 사용처 47곳 일괄 치환.

**왜** — "relative"는 무엇에 대한 상대인지 모호. 실제로는 React Router v6의 nested route에서 자식 경로(`path: "login"`) 형식으로 만드는 것이라 의도를 명시.

### 5-4. `.cjs` 모듈의 TypeScript 선언 파일 추가 (이 세션)

**무엇** — `apps/web/seo.config.d.cts`와 `apps/web/routes.d.cts` 신설. 각 `.cjs` 모듈의 export 시그니처를 TypeScript 타입으로 선언.

**왜** — `.cjs`를 .tsx에서 import하면 tsconfig 설정에 따라 동작이 갈렸음:
- 메인 `tsconfig.json`은 `allowJs: true`라 `router/index.tsx`에서는 자동 분석 → 정상
- `vite.config.ts` 전용 `tsconfig.node.json`은 `allowJs`가 없어 **"모듈 './seo.config.cjs'에 대한 선언 파일을 찾을 수 없습니다"** 에러 발생 (IDE 빨간 줄)

`tsc --noEmit -p tsconfig.json`만 검증했을 때는 통과해서 처음엔 `@ts-expect-error`를 제거했는데, IDE는 양쪽 tsconfig을 모두 본다는 점에서 vite.config.ts에 에러가 표시되었음. `tsc --build`로 두 tsconfig을 함께 검사하면 같은 에러가 재현됨.

**어떻게** — `.d.cts` 확장자는 `.cjs`의 canonical 선언 파일 형식. `moduleResolution: "bundler"`에서 우선적으로 탐색됨.
- `routes.d.cts`에는 `ROUTES`를 **리터럴 타입**(`readonly LOGIN: "/login"` 등)으로 선언 → IDE 자동완성이 라우트 38개를 모두 후보로 노출, 오타가 컴파일 타임에 잡힘
- `seo.config.d.cts`는 string/string[] 시그니처만 제공

**영향** — `@ts-expect-error` 주석 2곳(`vite.config.ts`, `router/index.tsx`) 완전 제거. 양쪽 tsconfig 모두에서 정상 동작. 라우터 작업 시 DX 향상.

**유지보수 노트** — 라우트 추가 시 `routes.cjs`(런타임)와 `routes.d.cts`(타입) 두 곳을 함께 갱신 필요. 한쪽만 추가하면 IDE에서 잡힘.

---

## 6. 회복탄력성 (이 세션)

### 6-1. `/space/join/:id` 에러 폴백

**무엇** — 복호화 실패 또는 백엔드 4xx/5xx 발생 시 raw 텍스트 500 응답을 **404 + noindex 메타 + 정상 SPA 셸** 응답으로 변경.

**왜** — 기존 동작은 두 문제가 있었음:
1. **봇 관점**: 500은 "일시적 오류"로 해석되어 봇이 재시도. 영구히 부재인 잘못된 초대 토큰을 반복 크롤.
2. **사용자 관점**: SPA가 마운트되지 않아 raw "Failed to fetch space data." 텍스트만 표시 → 자체 에러 UI/Channel Talk 등 모두 동작 안 함.

**어떻게**
```js
const fallback = injectMeta(html, {
  title: "초대장을 찾을 수 없습니다 | Layer",
  description: "이 회고 초대 링크는 만료되었거나 존재하지 않습니다.",
  image: DEFAULT_OG_IMAGE,
  url: getCanonicalUrl(req.path),
  noindex: true,
});
setCacheHeaders(res, "static-noindex");
return res.status(404).send(fallback);
```

**영향** — 봇은 영구 부재로 인식해 재시도 안 함. 사용자는 SPA의 자체 404 컴포넌트와 정상적인 UI를 만남.

---

## 7. 문서화 (이 세션)

### 7-1. `docs/seo-server-guide.md`

**무엇** — `server.cjs`의 동작 원리·아키텍처·검증 방법·유지보수 시나리오를 정리한 22KB / 517행 가이드.

**왜** — server.cjs는 SPA SEO를 위한 비표준 패턴이라 다음 담당자가 "이 파일 왜 있어?"라는 질문에서 출발해야 함. 한 번에 큰 그림과 세부 동작을 모두 전달.

**구성** — 0) 한 문장 요약 → 1) 배경(SPA SEO 문제) → 2) 아키텍처 다이어그램(3개 cjs + 2개 ts) → 3-4) 파일 구조 및 섹션별 상세 → 5) 라이프사이클 예시 → 6) curl 검증 → 7) 키워드 사전 → 8) 유지보수 시나리오별 체크리스트.

### 7-2. `docs/seo-improvements.md` (이 문서)

**무엇** — 이번 브랜치의 모든 변경사항·근거·영향을 주제별로 정리한 변경 이력.

**왜** — PR 리뷰어와 미래의 자기 자신이 "이 결정 왜 했지?"를 5분 안에 파악할 수 있도록 함. 시간 순서가 아닌 주제별(메타/URL/인덱싱/접근성/단일 소스/회복탄력성/문서화)로 묶어 cross-cutting 의사결정의 맥락 유지.

---

## 8. 최종 파일 변경 목록

### 신규 (6개)
| 경로 | 역할 |
|---|---|
| `apps/web/seo.config.cjs` | SEO 정책 단일 소스 (BASE_URL, OG 이미지, prefix 목록) |
| `apps/web/seo.config.d.cts` | seo.config.cjs의 TypeScript 선언 파일 |
| `apps/web/routes.cjs` | 라우트 경로 단일 소스 (ROUTES, KNOWN_ROUTE_PATTERNS derive) |
| `apps/web/routes.d.cts` | routes.cjs의 TypeScript 선언 파일 (ROUTES 리터럴 타입 포함) |
| `docs/seo-server-guide.md` | server.cjs 완벽 가이드 (아키텍처·동작 원리·검증) |
| `docs/seo-improvements.md` | 이 문서 — 변경사항 정리 |

### 수정 (6개)
| 경로 | 변경 |
|---|---|
| `apps/web/index.html` | 정적 canonical 제거, OG/Twitter 메타 통일, 중복 SDK 제거, viewport 복원, JSON-LD 구조화 데이터 추가 |
| `apps/web/server/server.cjs` | Express 메타 인젝션 서버 신설 → seo.config.cjs/routes.cjs 단일 소스화 → `/space/join` 404 폴백 |
| `apps/web/vite.config.ts` | Sitemap 정밀 설정 + robots.txt 자동 생성 Vite 플러그인 + seo.config.cjs import |
| `apps/web/src/router/index.tsx` | 47곳 inline path → `toChildPath(ROUTES.X)`로 derive |
| `apps/web/public/robots.txt` | 손편집 → Vite 플러그인 자동 생성 (헤더에 명시) |
| `apps/web/vercel.json` | server.cjs를 모든 비-정적 요청 핸들러로 등록 |

### 컴포넌트 단위 변경
다수 컴포넌트의 `<img>`에 `alt`, `width`, `height`, `loading`, `decoding` 속성 추가:
- `ProfileImage`, `JoinLetter`, `SpaceOverview`, `UserBox`, `TemplateCard` (mobile + desktop),
- `MemberActionView`, `MemberList`, `MembersItem`, `ImageUploader`, `SpaceItem`, `UserProfile`, `UserProfileIcon`

---

## 9. 검증 결과 (PR 머지 시점 기준)

| 검증 | 결과 |
|---|---|
| `pnpm tsc --noEmit -p tsconfig.json` (메인) | ✅ exit 0 |
| `pnpm tsc --build` (project references — vite.config.ts 포함) | ✅ exit 0 |
| `pnpm vite build` | ✅ exit 0 |
| `node --check server/server.cjs` | ✅ |
| `seo.config.cjs` / `routes.cjs` 런타임 로드 | ✅ 모든 export 정상 |
| noindex prefix 매칭 단위 테스트 12/12 | ✅ |
| KNOWN_ROUTE_PATTERNS 회귀 테스트 18/18 | ✅ |
| `dist/sitemap.xml` 검사 (공개 라우트 3개) | ✅ `/`, `/login`, `/template` |
| `dist/robots.txt` 자동 생성 헤더 확인 | ✅ |
| canonical 중복 0건 확인 | ✅ |
| IDE: vite.config.ts / router/index.tsx 타입 에러 | ✅ 해소 (`.d.cts` 추가) |

---

## 10. 남은 후속 작업 (이번 PR 범위 외)

### 단기 (배포 직후)
- Google Search Console에서 sitemap 제출 + 주요 URL의 "사용자 선언 canonical" vs "Google 선택 canonical" 확인
- Rich Results Test로 JSON-LD 검증
- Lighthouse SEO/접근성 점수 캡처 (배포 전후 비교)

### 중기
- `routes.cjs`의 `DESKTOP_PATHS`와 `router/index.tsx`의 `deviceType: "desktop"` 라우트가 여전히 손동기화 — 라우터의 deviceType metadata를 routes.cjs로 옮기면 완전한 단일 소스 달성
- `/retrospect/write`의 모바일 404 → 200 변경에 대한 운영 모니터링

### 장기
- router/index.tsx의 `lazy()` 컴포넌트 매핑을 컨벤션 기반으로 자동화 → routes.cjs가 라우트의 진짜 단일 소스가 됨

---

## 부록 — 커밋 일람

| SHA | 메시지 |
|---|---|
| eddb684d | 중복 OG/Twitter 메타 제거 / 초기 정적 canonical 제거 / Kakao SDK 중복 적용 제거 / 도메인 통일 www 제거 |
| f4faa5a6 | #847 SEO 메타 태그 주입 기능 추가 및 동적 라우트 설정 |
| a9e40237 | SEO 메타 태그 및 robots.txt 업데이트 / Vercel 설정 수정 |
| 8d65efd4 | 이미지 alt 속성 추가 및 로딩 최적화 / SEO 메타 태그 개선 |
| 391e256d | #847 Canonical 태그 중복 문제 수정 |
| c9fcccb0 | #847 SEO 라우트 정책을 seo.config.cjs로 분리 및 문서화 / 메타 주입 로직 개선 |
| 01ef9117 | #847 robots.txt 및 seo.config.cjs 동기화 기능 추가 / Vite 플러그인으로 자동 생성 |
| (미커밋) | `/space/join/:id` 에러 폴백, `routes.cjs` 단일 소스, `toRelative` → `toChildPath`, `@ts-expect-error` 제거, `.d.cts` 선언 파일 2개 추가, docs 작성 |
