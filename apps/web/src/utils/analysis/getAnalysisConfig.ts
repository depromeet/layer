type AnalysisType = "good" | "bad" | "improvement";

// * 타입에 따른 통합 객체 설정
const ANALYSIS_CONFIG = {
  good: {
    emoji: "👍",
    title: "잘 하고 있어요",
    icon: "ic_good_mark" as const,
    pointKey: "goodPoint" as const,
  },
  bad: {
    emoji: "😢",
    title: "이런 점은 부족해요",
    icon: "ic_bad_mark_red" as const,
    pointKey: "badPoint" as const,
  },
  improvement: {
    emoji: "🙌",
    title: "개선이 필요해요",
    icon: "ic_improve_mark" as const,
    pointKey: "improvementPoint" as const,
  },
} as const;

// * 분석 타입에 따른 설정 반환
export const getAnalysisConfig = (type: AnalysisType) => {
  return ANALYSIS_CONFIG[type];
};
