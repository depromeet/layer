export type Space = {
  id: string;
  category: "INDIVIDUAL" | "TEAM";
  fieldList: string[];
  name: string;
  introduction: string;
  formId: number;
  formTag: string | null;
  bannerUrl: string;
  memberCount: number;
  leader: { id: number; name: string };
  proceedingRetrospectCount: number;
  retrospectCount: number;
};
