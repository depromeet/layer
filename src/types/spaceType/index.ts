export type Space = {
  id: number;
  category: "INDIVIDUAL" | "TEAM";
  fieldList: string[];
  name: string;
  introduction: string;
  formId: number;
  bannerUrl: string;
  memberCount: number;
};
