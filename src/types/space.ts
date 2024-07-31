import { fieldArr } from "@/component/space/field.const";

export type FieldType = (typeof fieldArr)[number];

export type SpaceValue = {
  category: ProjectType;
  field: Array<FieldType>;
  name: string;
  introduction?: string;
  imgUrl?: string | File | null;
  step: number;
};

export enum ProjectType {
  Individual = "INDIVIDUAL",
  Team = "TEAM",
}
