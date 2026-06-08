/**
 * 라우트 경로 단일 소스 (Single Source of Truth).
 *
 * 사용처:
 *   - src/router/index.tsx     → React Router 경로 정의
 *   - server/server.cjs        → soft 404 방지 정규식 매칭
 *   - seo.config.cjs           → INDEXABLE_ROUTES 등의 SEO 정책 derive
 *
 * 동적 파라미터는 React Router 표기법(`:param`)을 사용하며,
 * `routeToRegex`가 자동으로 `[^/]+`로 변환합니다.
 */

/**
 * 명명 라우트 상수 (절대 경로 형태). 경로 문자열 SSOT는 `route-paths.json`.
 *
 * JSON으로 분리한 이유: 이 CJS 파일을 브라우저(Vite)에서 직접 import하면
 * Vite가 로컬 소스 CJS를 ESM으로 변환하지 않아 named export("ROUTES")를 못 찾습니다
 * ("does not provide an export named 'ROUTES'"). 순수 데이터인 경로 맵을 JSON으로 두면
 * Node(require)·Vite(import) 모두 네이티브로 지원합니다.
 *   - src/router/index.tsx → `import ROUTES from "../../route-paths.json"`
 *   - 이 파일(Node)        → require로 동일 데이터 사용 후 정규식 등 파생
 *
 * 라우터에서 자식 경로로 사용할 때는 `toChildPath()`로 앞 슬래시를 제거합니다.
 */
const ROUTES = require("./route-paths.json");

/**
 * 모든 reachable한 절대 경로 — server.cjs의 soft 404 화이트리스트.
 *
 * 데스크탑은 모바일과 동일하게 `/`에 마운트되므로 별도 `/desktop/*` 경로는 없습니다.
 * 레거시 `/desktop/*`는 server.cjs의 301 핸들러가 가로채 catch-all에 도달하지 않습니다.
 */
const ALL_ABSOLUTE_PATHS = [...Object.values(ROUTES)];

/**
 * React Router 경로 → 정규식.
 *   - `:param` → `[^/]+`
 *   - 정규식 메타문자는 이스케이프
 *   - 정확 매칭 (`^...$`)
 */
function routeToRegex(routePath) {
  const escaped = routePath
    .replace(/[.+*?^${}()|[\]\\]/g, "\\$&")
    .replace(/:[A-Za-z_][A-Za-z0-9_]*/g, "[^/]+");
  return new RegExp(`^${escaped}$`);
}

/**
 * 절대 경로 → React Router 자식 경로 형식 (앞의 "/" 제거).
 *
 * React Router v6의 nested route 패턴에서 자식 경로는 부모 경로 기준 상대 형식이어야 합니다.
 * 예) 부모 `path: "/"` + 자식 `path: "login"` → 최종 URL `/login`
 *
 * @example toChildPath(ROUTES.LOGIN)   // "/login" → "login"
 * @example toChildPath(ROUTES.ROOT)    // "/" → ""
 */
function toChildPath(routePath) {
  return routePath.startsWith("/") ? routePath.slice(1) : routePath;
}

/** server.cjs용 soft 404 방지 정규식 배열. */
const KNOWN_ROUTE_PATTERNS = ALL_ABSOLUTE_PATHS.map(routeToRegex);

module.exports = {
  ROUTES,
  ALL_ABSOLUTE_PATHS,
  KNOWN_ROUTE_PATTERNS,
  routeToRegex,
  toChildPath,
};
