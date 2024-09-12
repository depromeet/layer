import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import { Insight } from "@/types/analysis";
import { AxiosResponse } from "axios";
import { ErrorResponse } from "react-router-dom";

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
  const { track } = useMixpanel();

  const getAnalysis = () => {
    const res = api
      .get<AnalysisType>(`/space/${spaceId}/retrospect/${retrospectId}/analyze`)
      .then((res) => res.data)
      .catch((error: AxiosResponse<ErrorResponse>) => {
        throw error;
      });
    track("RESULT_ANALYSIS_VIEW", {
      retrospectId: +retrospectId,
      spaceId: +spaceId,
    });
    return res;
  };

  return useQuery({
    queryFn: () => getAnalysis(),
    queryKey: [spaceId, retrospectId],
    retry: false,
  });
};
