import { useMemo } from "react";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

const COLORS = [
  DESIGN_TOKEN_COLOR.blue600,
  DESIGN_TOKEN_COLOR.blue500,
  DESIGN_TOKEN_COLOR.blue400,
  DESIGN_TOKEN_COLOR.blue700,
  DESIGN_TOKEN_COLOR.blue800,
];

export type SatisfactionData = {
  name: string;
  value: number;
  color: string;
};

type UseSatisfactionDataReturn = {
  data: SatisfactionData[];
  dominantCategory: string;
  dominantColor: string;
  totalCount: number;
};

/**
 * 만족도 레벨 배열을 받아서 차트에 사용할 데이터로 변환하는 커스텀 훅
 * @param satisfactionLevels [매우만족, 만족, 보통, 불만족, 매우불만족] 순서의 숫자 배열
 * @returns 차트 데이터, 주요 카테고리, 주요 색상 등
 */
export const useSatisfactionData = (satisfactionLevels: number[]): UseSatisfactionDataReturn => {
  const data = useMemo(() => {
    const levels = [
      { name: "매우 만족", value: satisfactionLevels[0] || 0, color: COLORS[0] },
      { name: "만족", value: satisfactionLevels[1] || 0, color: COLORS[1] },
      { name: "보통", value: satisfactionLevels[2] || 0, color: COLORS[2] },
      { name: "불만족", value: satisfactionLevels[3] || 0, color: COLORS[3] },
      { name: "매우 불만족", value: satisfactionLevels[4] || 0, color: COLORS[4] },
    ];

    // 값이 0보다 큰 항목만 필터링하고 내림차순 정렬
    return levels.filter((level) => level.value > 0).sort((a, b) => b.value - a.value);
  }, [satisfactionLevels]);

  const dominantCategory = data[0]?.name || "보통";
  const dominantColor = data[0]?.color || COLORS[2];
  const totalCount = satisfactionLevels.reduce((sum, count) => sum + (count || 0), 0);

  return {
    data,
    dominantCategory,
    dominantColor,
    totalCount,
  };
};
