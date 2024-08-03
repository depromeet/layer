import { IconType } from "@/component/common/Icon/Icon";
import { FieldType, ProjectType } from "@/types/space";

export const categoryMap: {
  [key in ProjectType]: { name: string; icon_color: IconType; icon_white: IconType };
} = {
  INDIVIDUAL: { name: "개인", icon_color: "ic_human_color", icon_white: "ic_human_white" },
  TEAM: { name: "팀", icon_color: "ic_people_color", icon_white: "ic_people_white" },
};

export const fieldArr = ["PLANNER", "EDUCATION", "DEVELOPMENT", "DESIGN", "MANAGEMENT", "DATA_ANALYSIS", "MARKETING", "RESEARCH", "ETC"] as const;

export const fieldMap: {
  [key in FieldType]: { name: string; icon_color: IconType; icon_white: IconType };
} = {
  PLANNER: { name: "기획", icon_color: "ic_earth_color", icon_white: "ic_earth_white" },
  EDUCATION: { name: "교육", icon_color: "ic_education_color", icon_white: "ic_education_white" },
  DEVELOPMENT: { name: "개발", icon_color: "ic_developement_color", icon_white: "ic_developement_white" },
  DESIGN: { name: "디자인", icon_color: "ic_pencil_color", icon_white: "ic_pencil_white" },
  MANAGEMENT: { name: "운영 및 관리", icon_color: "ic_management_color", icon_white: "ic_management_white" },
  DATA_ANALYSIS: { name: "데이터 분석", icon_color: "ic_chart_color", icon_white: "ic_chart_white" },
  MARKETING: { name: "마케팅", icon_color: "ic_marketing_color", icon_white: "ic_marketing_white" },
  RESEARCH: { name: "연구", icon_color: "ic_flask_color", icon_white: "ic_flask_white" },
  ETC: { name: "기타", icon_color: "ic_document_color", icon_white: "ic_document_white" },
};

export const defaultImgUrl = "https://layer-bucket.kr.object.ncloudstorage.com/SPACE/12/5c781710-551e-444e-a977-73256ca2b07d";
