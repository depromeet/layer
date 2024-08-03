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

export const defaultImgUrl = "https://layer-bucket.kr.object.ncloudstorage.com/SPACE/12/5c781710-551e-444e-a977-73256ca2b07d";
