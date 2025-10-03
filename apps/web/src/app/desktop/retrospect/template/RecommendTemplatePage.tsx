import { api } from "@/api";
import { RecommendTemplateResponse } from "@/app/mobile/retrospect/template/recommend/RecommendTemplatePage";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { recommendTemplateState } from "@/store/retrospect/template/recommend/recommendAtom";
import { RecommendTemplateType } from "@/types/retrospectCreate/recommend";
import { useResetAtom } from "jotai/utils";
import { useState } from "react";
import { RecommendTemplate } from "../../component/retrospect/template/recommend";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { RecommendSearch } from "../../component/retrospect/template/recommend/Search";
import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import { useSetAtom } from "jotai";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";

export function RecommendTemplatePage() {
  const setRetrospectValue = useSetAtom(retrospectInitialState);
  const resetTemplateValue = useResetAtom(recommendTemplateState);
  const { openFunnelModal } = useFunnelModal();
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

      setRetrospectValue((prev) => ({
        ...prev,
        tempTemplateId: String(data.formId),
      }));

      track("TEMPLATE_RECOMMEND", {
        formId: data.formId,
        formName: data.formName,
        tag: data.tag,
      });
      resetTemplateValue();
      setIsLoading(false);

      openFunnelModal({
        title: "",
        step: "recommendTemplate",
        contents: <RecommendSearch newTempTemplateId={String(data.formId)} />,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <LoadingModal />;

  return <RecommendTemplate onSubmit={onSubmit} />;
}
