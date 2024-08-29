export type PeriodicType = "REGULAR" | "IRREGULAR";

export type PeriodType = "WEEKLY" | "MONTHLY" | "QUARTERLY" | "END_PROJECT";

export type PurposeType =
  | "CHECK_PROGRESS"
  | "PERSONAL_GROWTH"
  | "TEAM_GROWTH"
  | "IMPROVE_COMMUNICATION"
  | "SHARE_EXPERIENCE"
  | "IMPROVE_PROBLEM"
  | "SHARE_EMOTION"
  | "STRATEGY_SETTING";

export type RecommendTemplateType = {
  periodic: PeriodicType | null;
  period: PeriodType | null;
  purpose: PurposeType[];
  step: number;
};
