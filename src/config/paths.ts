export const PATHS = {
  login: () => `/login`,
  setNickName: (socialType: "kakao" | "google") => `/setnickname/${socialType}`,
  home: () => `/`,
  goals: () => `/goals`,
  analysis: () => `/analysis`,
  retrospectCreate: () => `/retrospect/new`,
  completeRetrospectCreate: () => `/retrospect/complete`,
  template: (spaceId: string) => `/space/${spaceId}/templates`,
  spaceDetail: (spaceId: string) => `/space/${spaceId}`,
  myInfo: () => `/myinfo`,
  myInfoModify: () => `/myinfo/modify`,
  userDeletion: () => `/myinfo/userdeletion`,
};
