import { PeriodType, PurposeType } from "@/types/retrospectCreate/recommend";

export const periodArr = ["WEEKLY", "MONTHLY", "QUARTERLY", "END_PROJECT"] as const;

export const periodMap: {
  [key in PeriodType]: { name: string };
} = {
  WEEKLY: { name: "주간" },
  MONTHLY: { name: "월간" },
  QUARTERLY: { name: "분기별" },
  END_PROJECT: { name: "프로젝트 끝난 후" },
};

export const purposeArr: PurposeType[] = [
  "CHECK_PROGRESS",
  "PERSONAL_GROWTH",
  "TEAM_GROWTH",
  "IMPROVE_COMMUNICATION",
  "SHARE_EXPERIENCE",
  "IMPROVE_PROBLEM",
  "SHARE_EMOTION",
  "STRATEGY_SETTING",
] as const;

export const purposeMap: {
  [key in PurposeType]: { name: string };
} = {
  CHECK_PROGRESS: { name: "진행상황 점검" },
  PERSONAL_GROWTH: { name: "개인의 성장" },
  TEAM_GROWTH: { name: "팀의 성장" },
  IMPROVE_COMMUNICATION: { name: "커뮤니케이션 개선" },
  SHARE_EXPERIENCE: { name: "팀원간의 경험 공유" },
  IMPROVE_PROBLEM: { name: "문제점 개선" },
  SHARE_EMOTION: { name: "감정 공유" },
  STRATEGY_SETTING: { name: "프로젝트 전략 설정" },
};
