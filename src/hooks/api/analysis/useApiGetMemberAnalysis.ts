import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { MyInsight, Point } from "@/types/analysis";

export type AnalysisType = {
  recentAnalyzes: MyInsight[];
  goodAnalyzes: Point[];
  badAnalyzes: Point[];
  improvementAnalyzes: Point[];
};

export const useApiGetMemberAnalysis = () => {
  const getAnalysis = () => {
    const res = api.get<AnalysisType>(`/api/member/analyze`).then((res) => res.data);
    return res;
  };

  return useQuery({
    queryFn: () => getAnalysis(),
    queryKey: [],
  });
};
