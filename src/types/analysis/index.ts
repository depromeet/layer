export type analysisType = "goodPoints" | "badPoints" | "improvementPoints";

export type analysisItemType = "GOOD" | "BAD" | "IMPROVEMENT";

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
};
