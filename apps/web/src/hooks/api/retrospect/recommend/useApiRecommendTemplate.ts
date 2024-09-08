import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { RecommendTemplateType } from "@/types/retrospectCreate/recommend";

type RecommendTemplateResponse = {
  formId: number;
  formImageUrl: string;
  formName: string;
  tag: string;
};

export const useApiRecommendTemplate = (recommendValue: RecommendTemplateType) => {
  const recommendTemplate = async (recommendValue: RecommendTemplateType) => {
    const { period, periodic, purpose } = recommendValue;
    const res = await api.get<RecommendTemplateResponse>(`/form/recommend`, {
      params: {
        periodic,
        period,
        purpose: purpose.join(","),
      },
    });
    return res.data;
  };

  return useQuery({
    queryKey: ["recommendTemplate", recommendValue],
    queryFn: () => recommendTemplate(recommendValue),
    staleTime: Infinity,
  });
};
