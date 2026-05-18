/**
 * SEO 라우트 정책 단일 소스 (Single Source of Truth).
 *
 * 사용처:
 *   - vite.config.ts        → sitemap.xml의 dynamicRoutes / exclude
 *   - server/server.cjs     → noindex 메타 / canonical 분기 / OG 기본 이미지
 *
 * 라우트 추가·변경 시 이 파일만 갱신하면 sitemap·메타·캐시 정책이 일관되게 반영됩니다.
 * 단, `public/robots.txt`는 정적 파일이라 별도 동기화가 필요합니다.
 *
 * @see apps/web/src/router/index.tsx  실제 라우터 정의
 */

const BASE_URL = "https://layerapp.io";

const DEFAULT_OG_IMAGE =
  "https://kr.object.ncloudstorage.com/layer-bucket/og-image.png";

const INVITE_OG_IMAGE =
  "https://kr.object.ncloudstorage.com/layer-bucket/retrospectOG.png";

/**
 * 공개 인덱싱 라우트 (sitemap dynamicRoutes).
 * 루트("/")는 sitemap hostname이 자동 포함하므로 생략합니다.
 */
const INDEXABLE_ROUTES = ["/login", "/template"];

/**
 * 비공개(noindex) 라우트 prefix.
 *
 * - 매칭: `req.path.startsWith(prefix)`
 * - 효과: sitemap 제외 + `<meta name="robots" content="noindex, nofollow">` 주입 + canonical 미주입
 *
 * 예외: `/space/join/:id`는 server.cjs에 별도 라우트 핸들러가 등록되어 있어
 *       catch-all에 도달하지 않으므로 이 정책이 적용되지 않습니다.
 *       (초대 링크 OG 미리보기를 위해 의도된 예외)
 */
const PRIVATE_ROUTE_PREFIXES = [
  "/myinfo",
  "/write",
  "/retrospect",   // /retrospect/{new,complete,analysis,recommend}
  "/space",        // /space/:id 등 — /space/join/:id는 별도 핸들러로 우회
  "/goals",
  "/analysis",
  "/setnickname",
  "/api",
  "/staging",
  "/desktop",      // 데스크탑은 모바일과 동일 콘텐츠 → canonical 통일 (`/desktop/x` → `/x`)
];

/** vite-plugin-sitemap의 `exclude` 형식 (glob). */
const SITEMAP_EXCLUDE = PRIVATE_ROUTE_PREFIXES.flatMap((p) => [p, `${p}/**`]);

/** server.cjs의 `startsWith` 매칭용 prefix 목록. */
const NOINDEX_PATH_PREFIXES = PRIVATE_ROUTE_PREFIXES;

module.exports = {
  BASE_URL,
  DEFAULT_OG_IMAGE,
  INVITE_OG_IMAGE,
  INDEXABLE_ROUTES,
  PRIVATE_ROUTE_PREFIXES,
  SITEMAP_EXCLUDE,
  NOINDEX_PATH_PREFIXES,
};
