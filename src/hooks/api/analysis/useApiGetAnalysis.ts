import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { Insight } from "@/types/analysis";

export type AnalysisType = {
  teamAnalyze: {
    scoreOne: number;
    scoreTwo: number;
    scoreThree: number;
    scoreFour: number;
    scoreFive: number;
    goalCompletionRate: number;
    goodPoints: Insight[];
    badPoints: Insight[];
    improvementPoints: Insight[];
  };
  individualAnalyze: {
    goodPoints: Insight[];
    badPoints: Insight[];
    improvementPoints: Insight[];
  };
};

export const useApiGetAnalysis = ({ spaceId, retrospectId }: { spaceId: string; retrospectId: string }) => {
  const getAnalysis = () => {
    const res = api.get<AnalysisType>(`/space/${spaceId}/retrospect/${retrospectId}/analyze`).then((res) => res.data);
    return res;
  };

  return useQuery({
    queryFn: () => getAnalysis(),
    queryKey: [spaceId],
  });
};
