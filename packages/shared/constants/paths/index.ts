export const PATHS = {
  login: () => `/login` as const,
  setNickName: (socialType: "kakao" | "google" | "apple") =>
    `/setnickname/${socialType}` as const,
  home: () => `/` as const,
  goals: () => `/goals` as const,
  goalsMore: () => `/goals/more` as const,
  goalsEdit: () => `/goals/edit` as const,
  analysis: () => `/analysis` as const,
  retrospectCreate: () => `/retrospect/new` as const,
  retrospectRecommend: () => `/retrospect/recommend` as const,
  retrospectRecommendDone: () => `/retrospect/recommend/done` as const,
  write: () => `/write` as const,
  completeRetrospectCreate: () => `/retrospect/complete` as const,
  template: (spaceId: string) => `/space/${spaceId}/templates` as const,
  viewDetailTemplate: () => `/template` as const,
  spaceCreate: () => `/space/create` as const,
  spaceDetail: (spaceId: string) => `/space/${spaceId}` as const,
  myInfo: () => `/myinfo` as const,
  myInfoModify: () => `/myinfo/modify` as const,
  userDeletion: () => `/myinfo/userdeletion` as const,
  notices: () => `/myinfo/notices` as const,
  help: () => `/myinfo/help` as const,
  license: () => `/myinfo/license` as const,
  termsofservice: () => `/myinfo/termsofservice` as const,
  privacypolicy: () => `/myinfo/privacypolicy` as const,
  feedback: () => `/myinfo/feedback` as const,
  retrospectAnalysis: (spaceId: string, retrospectId: number) =>
    `/retrospect/analysis?spaceId=${spaceId}&retrospectId=${retrospectId}` as const,
} as const;

export type Path = ReturnType<(typeof PATHS)[keyof typeof PATHS]>;
