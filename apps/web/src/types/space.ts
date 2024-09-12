import { fieldArr } from "@/component/space/space.const";

export type FieldType = (typeof fieldArr)[number];

export type SpaceValue = {
  category: ProjectType;
  field: Array<FieldType>;
  name: string;
  introduction?: string;
  imgUrl?: string | File | null;
  step: number;
  submit?: boolean;
};

export enum ProjectType {
  Individual = "INDIVIDUAL",
  Team = "TEAM",
}

export type SpaceRes = {
  id: number;
  category: "INDIVIDUAL" | "TEAM";
  //FIXME - fieldList 타입 채우기
  fieldList: ["PLANNER"];
  name: string;
  introduction: string;
  formId: number;
  memberCount: number;
  bannerUrl: string;
};
