/**
 * Type declarations for `./routes.cjs`.
 *
 * `.cjs` 모듈을 .ts/.tsx에서 import할 때 TypeScript가 타입을 추론할 수 있도록 제공합니다.
 * 런타임 동작은 `routes.cjs`에 정의되어 있으며, 이 파일은 시그니처만 선언합니다.
 *
 * 라우트 추가 시 두 곳을 함께 갱신하세요:
 *   1. `routes.cjs`의 `ROUTES` 객체
 *   2. 이 파일의 `ROUTES` 인터페이스 (IDE 자동완성 + 타입 안전성)
 */

/**
 * 명명 라우트 상수 (절대 경로 형태).
 * 라우터에서 자식 경로로 사용할 때는 `toChildPath()`로 앞 슬래시를 제거합니다.
 */
export declare const ROUTES: {
  readonly ROOT: "/";
  readonly LOGIN: "/login";
  readonly TEMPLATE: "/template";
  readonly STAGING: "/staging";
  readonly ANALYSIS: "/analysis";

  readonly WRITE: "/write";
  readonly WRITE_COMPLETE: "/write/complete";

  readonly GOALS: "/goals";
  readonly GOALS_MORE: "/goals/more";
  readonly GOALS_EDIT: "/goals/edit";

  readonly SETNICKNAME: "/setnickname/:socialType";

  readonly SPACE_CREATE: "/space/create";
  readonly SPACE_CREATE_DONE: "/space/create/done";
  readonly SPACE_CREATE_NEXT: "/space/create/next";
  readonly SPACE_EDIT: "/space/edit/:id";
  readonly SPACE_VIEW: "/space/:spaceId";
  readonly SPACE_TEMPLATES: "/space/:spaceId/templates";
  readonly SPACE_MEMBERS: "/space/:spaceId/members";
  readonly SPACE_MEMBERS_EDIT: "/space/:spaceId/members/edit";
  readonly SPACE_JOIN: "/space/join/:id";

  readonly RETROSPECT_NEW: "/retrospect/new";
  readonly RETROSPECT_COMPLETE: "/retrospect/complete";
  readonly RETROSPECT_ANALYSIS: "/retrospect/analysis";
  readonly RETROSPECT_WRITE: "/retrospect/write";
  readonly RETROSPECT_RECOMMEND: "/retrospect/recommend";
  readonly RETROSPECT_RECOMMEND_SEARCH: "/retrospect/recommend/search";
  readonly RETROSPECT_RECOMMEND_DONE: "/retrospect/recommend/done";

  readonly MYINFO: "/myinfo";
  readonly MYINFO_MODIFY: "/myinfo/modify";
  readonly MYINFO_USERDELETION: "/myinfo/userdeletion";
  readonly MYINFO_NOTICES: "/myinfo/notices";
  readonly MYINFO_HELP: "/myinfo/help";
  readonly MYINFO_LICENSE: "/myinfo/license";
  readonly MYINFO_TERMSOFSERVICE: "/myinfo/termsofservice";
  readonly MYINFO_PRIVACYPOLICY: "/myinfo/privacypolicy";
  readonly MYINFO_FEEDBACK: "/myinfo/feedback";

  readonly OAUTH_KAKAO: "/api/auth/oauth2/kakao";
  readonly OAUTH_GOOGLE: "/api/auth/oauth2/google";
};

/** `/desktop` 접두사가 붙어 reachable한 라우트. */
export declare const DESKTOP_PATHS: string[];

/** 모든 reachable한 절대 경로. */
export declare const ALL_ABSOLUTE_PATHS: string[];

/** server.cjs용 soft 404 방지 정규식 배열. */
export declare const KNOWN_ROUTE_PATTERNS: RegExp[];

/** React Router 경로 → 정규식 변환. */
export declare function routeToRegex(routePath: string): RegExp;

/**
 * 절대 경로 → React Router 자식 경로 형식 (앞의 "/" 제거).
 *
 * @example toChildPath("/login") // "login"
 * @example toChildPath("/")      // ""
 */
export declare function toChildPath(routePath: string): string;
