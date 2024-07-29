export type Space = {
  id: number;
  category: "INDIVIDUAL" | "TEAM";
  fieldList: string[];
  name: string;
  introduction: string;
  formId: number;
  imgUrl: string;
  memberCount: number;
};
