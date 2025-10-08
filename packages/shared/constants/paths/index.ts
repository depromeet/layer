import { getDeviceType } from "@/utils/deviceUtils";

export const createPaths = () => {
  const { deviceType } = getDeviceType();
  const prefix = deviceType === "mobile" ? "/m" : "";

  return {
    login: () => `${prefix}/login` as const,
    setNickName: (socialType: "kakao" | "google" | "apple") =>
      `${prefix}/setnickname/${socialType}` as const,
    home: () => prefix || ("/" as const),
    goals: () => `${prefix}/goals` as const,
    goalsMore: () => `${prefix}/goals/more` as const,
    goalsEdit: () => `${prefix}/goals/edit` as const,
    analysis: () => `${prefix}/analysis` as const,
    retrospectCreate: () => `${prefix}/retrospect/new` as const,
    retrospectRecommend: () => `${prefix}/retrospect/recommend` as const,
    retrospectRecommendDone: () =>
      `${prefix}/retrospect/recommend/done` as const,
    retrospectRecommendSearch: () =>
      `${prefix}/retrospect/recommend/search` as const,
    write: () => `${prefix}/write` as const,
    completeRetrospectWrite: () => `${prefix}/write/complete` as const,
    completeRetrospectCreate: () => `${prefix}/retrospect/complete` as const,
    /*TODO 회고 생성 후 실제 스페이스 URL로 변경 */
    DesktopcompleteRetrospectCreate: (spaceId: string) =>
      `${prefix}/retrospectSpace/${spaceId}` as const,
    template: (spaceId: string) =>
      `${prefix}/space/${spaceId}/templates` as const,
    viewDetailTemplate: () => `${prefix}/template` as const,
    spaceEdit: (spaceId: string) => `${prefix}/space/edit/${spaceId}` as const,
    spaceCreate: () => `${prefix}/space/create` as const,
    spaceCreateNext: () => `${prefix}/space/create/next` as const,
    spaceDetail: (spaceId: string) => `${prefix}/space/${spaceId}` as const,
    spaceCreateDone: () => `${prefix}/space/create/done` as const,
    spaceMembers: (spaceId: string) =>
      `${prefix}/space/${spaceId}/members` as const,
    myInfo: () => `${prefix}/myinfo` as const,
    myInfoModify: () => `${prefix}/myinfo/modify` as const,
    userDeletion: () => `${prefix}/myinfo/userdeletion` as const,
    notices: () => `${prefix}/myinfo/notices` as const,
    help: () => `${prefix}/myinfo/help` as const,
    license: () => `${prefix}/myinfo/license` as const,
    termsofservice: () => `${prefix}/myinfo/termsofservice` as const,
    privacypolicy: () => `${prefix}/myinfo/privacypolicy` as const,
    feedback: () => `${prefix}/myinfo/feedback` as const,
    retrospectAnalysis: (
      spaceId: string,
      retrospectId: number,
      title?: string
    ) => {
      const baseUrl = `${prefix}/retrospect/analysis?spaceId=${spaceId}&retrospectId=${retrospectId}`;
      return title ? `${baseUrl}&title=${encodeURIComponent(title)}` : baseUrl;
    },
    retrospectWrite: () => `${prefix}/retrospect/write`,
  } as const;
};

export const PATHS = createPaths();
export type Path = ReturnType<(typeof PATHS)[keyof typeof PATHS]>;
