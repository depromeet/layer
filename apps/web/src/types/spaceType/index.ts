export type Space = {
  id: number;
  category: "INDIVIDUAL" | "TEAM";
  fieldList: string[];
  name: string;
  introduction: string;
  formId: number;
  formTag: string | null;
  bannerUrl: string;
  memberCount: number;
  leader: { id: number; name: string };
};
