import { InsightIconName } from "@/types/analysis";

type AnalysisType = "good" | "bad" | "improvement";

// * 타입에 따른 통합 객체 설정
const ANALYSIS_CONFIG = {
  good: {
    emoji: "ic_good_home" as InsightIconName,
    title: "잘 하고 있어요",
    icon: "ic_good_mark" as InsightIconName,
    pointKey: "goodPoint" as const,
    iconSize: 2.6,
  },
  bad: {
    emoji: "ic_bad_home" as InsightIconName,
    title: "이런 점은 부족해요",
    icon: "ic_bad_mark_red" as InsightIconName,
    pointKey: "badPoint" as const,
    iconSize: 2.6,
  },
  improvement: {
    emoji: "ic_improve_home" as InsightIconName,
    title: "개선이 필요해요",
    icon: "ic_improve_mark" as InsightIconName,
    pointKey: "improvementPoint" as const,
    iconSize: 2,
  },
} as const;

const ANALYSIS_CONFIG_EMPTY = {
  good: {
    emoji: "ic_good_home_white" as InsightIconName,
    title: "잘 하고 있어요",
    icon: "ic_good_mark" as InsightIconName,
    pointKey: "goodPoint" as const,
    iconSize: 2.8,
  },
  bad: {
    emoji: "ic_bad_home_white" as InsightIconName,
    title: "이런 점은 부족해요",
    icon: "ic_bad_mark" as InsightIconName,
    pointKey: "badPoint" as const,
    iconSize: 2.2,
  },
  improvement: {
    emoji: "ic_improve_home_white" as InsightIconName,
    title: "개선이 필요해요",
    icon: "ic_improve_mark" as InsightIconName,
    pointKey: "improvementPoint" as const,
    iconSize: 2.2,
  },
};

// * 분석 타입에 따른 설정 반환
export const getAnalysisConfig = (type: AnalysisType) => {
  return ANALYSIS_CONFIG[type];
};

export const getAnalysisConfigEmpty = (type: AnalysisType) => {
  return ANALYSIS_CONFIG_EMPTY[type];
};
