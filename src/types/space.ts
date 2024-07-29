export const fieldArr = ["PLANNER", "EDUCATION", "DEVELOPMENT", "DESIGN", "MANAGEMENT", "DATA_ANALYSIS", "MARKETING", "RESEARCH", "ETC"] as const;
export type FieldType = (typeof fieldArr)[number];

export const fieldMap: {
  [key in FieldType]: string;
} = {
  PLANNER: "기획",
  EDUCATION: "교육",
  DEVELOPMENT: "개발",
  DESIGN: "디자인",
  MANAGEMENT: "운영 및 관리",
  DATA_ANALYSIS: "데이터 분석",
  MARKETING: "마케팅",
  RESEARCH: "연구",
  ETC: "기타",
};

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
