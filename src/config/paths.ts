export const PATHS = {
  login: () => `/login`,
  setNickName: (socialType: "kakao" | "google") => `/setnickname/${socialType}`,
  home: () => `/`,
  goals: () => `/goals`,
  analysis: () => `/analysis`,
  retrospectCreate: () => `/retrospect/new`,
  completeRetrospectCreate: () => `/retrospect/complete`,
};
