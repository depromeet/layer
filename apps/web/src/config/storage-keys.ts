export const COOKIE_KEYS = {
  redirectPrevPathKey: "prev-path",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  memberId: "memberId",
} as const;

/** 인증 쿠키 공통 옵션 (secure + sameSite: lax for iOS WebView 호환) */
const BASE_COOKIE_OPTIONS = {
  secure: true,
  sameSite: "lax" as const,
};

/** accessToken 쿠키 옵션 (1시간) */
export const ACCESS_TOKEN_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
  expires: 1 / 24,
};

/** refreshToken / memberId 쿠키 옵션 (7일) */
export const AUTH_COOKIE_OPTIONS = {
  ...BASE_COOKIE_OPTIONS,
  expires: 7,
};

export const LOCAL_STORAGE_KEYS = {
  utmParamsKey: "UTM_PARAMS",
  recentSocialLoginType: "RECENT_SOCIAL_LOGIN_TYPE",
  /** 실행목표 팀/개인 NEW 안내 툴팁을 본 적 있는지 (한 번만 노출) */
  actionItemGoalTooltipSeen: "ACTION_ITEM_GOAL_TOOLTIP_SEEN",
} as const;
