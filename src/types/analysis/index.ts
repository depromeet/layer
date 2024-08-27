export type analysisType = "goodPoints" | "badPoints" | "improvementPoints";

export type analysisItemType = "GOOD" | "BAD" | "IMPROVEMENT";

export type Insight = {
  analyzeType: analysisItemType;
  content: string;
  count: number;
};
