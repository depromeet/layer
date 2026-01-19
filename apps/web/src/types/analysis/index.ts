export type analysisType = "goodPoints" | "badPoints" | "improvementPoints";

export type analysisItemType = "GOOD" | "BAD" | "IMPROVEMENT";

export type InsightIconName =
  | "ic_good_mark"
  | "ic_bad_mark_red"
  | "ic_improve_blue_mark"
  | "ic_improve_home"
  | "ic_good_home"
  | "ic_bad_home"
  | "ic_good_home_white"
  | "ic_bad_home_white"
  | "ic_improve_home_white";

export type Insight = {
  isTeam: boolean;
  analyzeType: analysisItemType;
  content: string;
  count: number;
};

export type MyInsight = {
  spaceId: number;
  spaceName: string;
  retrospectId: number;
  retrospectTitle: string;
  deadline: string;
  point?: string;
};

export type BasePoint = {
  spaceId: number;
  spaceName: string;
  retrospectId: number;
  retrospectTitle: string;
  deadline: string;
};

export type Point = (BasePoint & { goodPoint: string }) | (BasePoint & { improvementPoint: string }) | (BasePoint & { badPoint: string });

export type OriginalPoint =
  | (BasePoint & { goodPoint?: string | null })
  | (BasePoint & { improvementPoint?: string | null })
  | (BasePoint & { badPoint?: string | null });

export type TransformPoint = BasePoint & { point: string };
