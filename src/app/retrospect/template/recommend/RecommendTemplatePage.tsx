import { useResetAtom } from "jotai/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { RecommendTemplate } from "@/component/retrospect/template/recommend/RecommendTemplate";
import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import { recommendTemplateState } from "@/store/retrospect/template/recommend/recommendAtom";
import { RecommendTemplateType } from "@/types/retrospectCreate/recommend";

export type RecommendTemplateResponse = {
  formId: number;
  formImageUrl: string;
  formName: string;
  tag: string;
};

export function RecommendTemplatePage() {
  const navigate = useNavigate();
  const resetTemplateValue = useResetAtom(recommendTemplateState);
  const [isLoading, setIsLoading] = useState(false);
  const { track } = useMixpanel();

  const onSubmit = async (recommendValue: RecommendTemplateType & { spaceId: string }) => {
    try {
      setIsLoading(true);
      const { period, periodic, purpose } = recommendValue;
      const { data } = await api.get<RecommendTemplateResponse>(`/form/recommend`, {
        params: {
          periodic,
          period,
          purpose: purpose.join(","),
        },
      });
      track("TEMPLATE_RECOMMEND", {
        formId: data.formId,
        formName: data.formName,
        tag: data.tag,
      });
      navigate("/retrospect/recommend/done", { state: { templateId: data.formId, spaceId: recommendValue.spaceId } });
      resetTemplateValue();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <LoadingModal />;

  return <RecommendTemplate onSubmit={onSubmit} />;
}
