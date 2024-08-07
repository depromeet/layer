export const PATHS = {
  home: () => `/`,
  goals: () => `/goals`,
  analysis: () => `/analysis`,
  retrospectCreate: () => `/retrospect/new`,
  completeRetrospectCreate: () => `/retrospect/complete`,
  template: (spaceId: string) => `/space/${spaceId}/templates`,
  spaceDetail: (spaceId: string) => `/space/${spaceId}`,
};
