export const COOKIE_KEYS = {
  redirectPrevPathKey: "prev-path",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  memberId: "memberId",
} as const;

/** 인증 쿠키 공통 옵션 (secure + sameSite: lax for iOS WebView 호환) */
export const AUTH_COOKIE_OPTIONS = {
  expires: 7,
  secure: true,
  sameSite: "lax" as const,
};

export const LOCAL_STORAGE_KEYS = {
  utmParamsKey: "UTM_PARAMS",
} as const;
