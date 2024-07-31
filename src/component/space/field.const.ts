import { FieldType } from "@/types/space";

export const fieldArr = ["PLANNER", "EDUCATION", "DEVELOPMENT", "DESIGN", "MANAGEMENT", "DATA_ANALYSIS", "MARKETING", "RESEARCH", "ETC"] as const;

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
