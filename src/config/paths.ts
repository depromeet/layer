export const PATHS = {
  login: () => `/login`,
  setNickName: (socialType: "kakao" | "google") => `/setnickname/${socialType}`,
  home: () => `/`,
  goals: () => `/goals`,
  goalsMore: () => `/goals/more`,
  analysis: () => `/analysis`,
  retrospectCreate: () => `/retrospect/new`,
  write: () => `/write`,
  completeRetrospectCreate: () => `/retrospect/complete`,
  template: (spaceId: string) => `/space/${spaceId}/templates`,
  spaceCreate: () => `/space/create`,
  spaceDetail: (spaceId: string) => `/space/${spaceId}`,
  myInfo: () => `/myinfo`,
  myInfoModify: () => `/myinfo/modify`,
  userDeletion: () => `/myinfo/userdeletion`,
  notices: () => `/myinfo/notices`,
  help: () => `/myinfo/help`,
  license: () => `/myinfo/license`,
  termsofservice: () => `/myinfo/termsofservice`,
  privacypolicy: () => `/myinfo/privacypolicy`,
  feedback: () => `/myinfo/feedback`,
  retrospectAnalysis: () => `/retrospect/analysis`,
};
