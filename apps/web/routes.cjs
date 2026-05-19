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
 * 명명 라우트 상수 (절대 경로 형태).
 * 라우터에서 자식 경로로 사용할 때는 `toChildPath()`로 앞 슬래시를 제거합니다.
 */
const ROUTES = {
  // ── 공통 / 모바일 (mobile 레이아웃에서 reachable) ─────
  ROOT: "/",
  LOGIN: "/login",
  TEMPLATE: "/template",
  STAGING: "/staging",
  ANALYSIS: "/analysis",

  WRITE: "/write",
  WRITE_COMPLETE: "/write/complete",

  GOALS: "/goals",
  GOALS_MORE: "/goals/more",
  GOALS_EDIT: "/goals/edit",

  SETNICKNAME: "/setnickname/:socialType",

  // 스페이스
  SPACE_CREATE: "/space/create",
  SPACE_CREATE_DONE: "/space/create/done",
  SPACE_CREATE_NEXT: "/space/create/next",
  SPACE_EDIT: "/space/edit/:id",
  SPACE_VIEW: "/space/:spaceId",
  SPACE_TEMPLATES: "/space/:spaceId/templates",
  SPACE_MEMBERS: "/space/:spaceId/members",
  SPACE_MEMBERS_EDIT: "/space/:spaceId/members/edit",
  SPACE_JOIN: "/space/join/:id",

  // 회고
  RETROSPECT_NEW: "/retrospect/new",
  RETROSPECT_COMPLETE: "/retrospect/complete",
  RETROSPECT_ANALYSIS: "/retrospect/analysis",
  RETROSPECT_WRITE: "/retrospect/write",   // 데스크탑 레이아웃에서만 마운트되지만 상수로 명명
  RETROSPECT_RECOMMEND: "/retrospect/recommend",
  RETROSPECT_RECOMMEND_SEARCH: "/retrospect/recommend/search",
  RETROSPECT_RECOMMEND_DONE: "/retrospect/recommend/done",

  // 내 정보
  MYINFO: "/myinfo",
  MYINFO_MODIFY: "/myinfo/modify",
  MYINFO_USERDELETION: "/myinfo/userdeletion",
  MYINFO_NOTICES: "/myinfo/notices",
  MYINFO_HELP: "/myinfo/help",
  MYINFO_LICENSE: "/myinfo/license",
  MYINFO_TERMSOFSERVICE: "/myinfo/termsofservice",
  MYINFO_PRIVACYPOLICY: "/myinfo/privacypolicy",
  MYINFO_FEEDBACK: "/myinfo/feedback",

  // OAuth
  OAUTH_KAKAO: "/api/auth/oauth2/kakao",
  OAUTH_GOOGLE: "/api/auth/oauth2/google",
};

/**
 * `/desktop` 접두사가 붙어 reachable한 라우트.
 *
 * 동일한 상대 경로가 router/index.tsx의 deviceSpecificRoutes에서
 * `deviceType: "desktop"`으로 정의되어 있어 `/desktop` 마운트 포인트 아래에
 * 추가로 노출됩니다.
 *
 * 라우터에서 `deviceType: "desktop"` 라우트를 추가/제거할 때 이 목록도 갱신하세요.
 */
const DESKTOP_PATHS = [
  "/desktop",
  "/desktop/login",
  "/desktop/goals",
  "/desktop/space/:spaceId",
  "/desktop/retrospect/analysis",
  "/desktop/retrospect/write",
  "/desktop/setnickname/:socialType",
];

/** 모든 reachable한 절대 경로 — server.cjs의 soft 404 화이트리스트. */
const ALL_ABSOLUTE_PATHS = [...Object.values(ROUTES), ...DESKTOP_PATHS];

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
  DESKTOP_PATHS,
  ALL_ABSOLUTE_PATHS,
  KNOWN_ROUTE_PATTERNS,
  routeToRegex,
  toChildPath,
};
