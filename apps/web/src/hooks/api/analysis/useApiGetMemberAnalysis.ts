import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/api";
import { MyInsight, Point } from "@/types/analysis";

export type AnalysisType = {
  recentAnalyzes: MyInsight[];
  goodAnalyzes: Point[];
  badAnalyzes: Point[];
  improvementAnalyzes: Point[];
};

type UseApiGetMemberAnalysisProps = {
  options?: Omit<UseQueryOptions<AnalysisType, Error>, "queryKey">;
};

export const useApiGetMemberAnalysis = ({ options }: UseApiGetMemberAnalysisProps = {}) => {
  const getAnalysis = () => {
    const res = api.get<AnalysisType>(`/api/member/analyze`).then((res) => res.data);
    return res;
  };

  return useQuery<AnalysisType>({
    queryFn: () => getAnalysis(),
    queryKey: ["myAnalysis"],
    ...options,
  });
};
