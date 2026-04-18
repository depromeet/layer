import { ProgressBar } from "@/component/common/ProgressBar";
import { recommendTemplateState } from "@/store/retrospect/template/recommend/recommendAtom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Periodic } from "./Periodic";
import { Period } from "./Period";
import { Purpose } from "./Purpose";
import { RecommendTemplateType } from "@/types/retrospectCreate/recommend";
import { useEffect, useState } from "react";
import { useRequiredParams } from "@/hooks/useRequiredParams";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useActionModal } from "@/hooks/useActionModal";
import { TemplateChoice } from "@/app/desktop/component/retrospect/choice";
import { RetrospectCreate } from "@/app/desktop/component/retrospectCreate";
import { api } from "@/api";
import { RecommendTemplateResponse } from "@/app/mobile/retrospect/template/recommend/RecommendTemplatePage";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import { useResetAtom } from "jotai/utils";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { RecommendSearch } from "./Search";
import { trackEvent } from "@/lib/google_analytics";
import { GA_FUNNEL_LABELS } from "@/lib/google_analytics/events";
import { branchLayoutAtom } from "@/store/auth/authAtom";
import { TemplateList } from "../list";

const LAST_PAGE = 2;

export function TemplateRecommend() {
  const [templateValue, setTemplateValue] = useAtom(recommendTemplateState);
  const { spaceId } = useRequiredParams<{ spaceId: string }>();
  const { openFunnelModal } = useFunnelModal();
  const { openActionModal } = useActionModal();
  const setRetrospectValue = useSetAtom(retrospectInitialState);
  const resetTemplateValue = useResetAtom(recommendTemplateState);
  const [isLoading, setIsLoading] = useState(false);
  const { track } = useMixpanel();
  const branchLayout = useAtomValue(branchLayoutAtom);

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

  // 템플릿 추천 퍼널 단계 변경 시 GA 이벤트를 전송해요
  useEffect(() => {
    if (templateValue.step > LAST_PAGE) return;

    trackEvent({
      action: "retrospect_recommend_funnel_view",
      category: "retrospect",
      label: GA_FUNNEL_LABELS.TEMPLATE_RECOMMEND[templateValue.step],
    });
  }, [templateValue.step]);

  useEffect(() => {
    if (templateValue.step === LAST_PAGE + 1) {
      onSubmit({
        ...templateValue,
        ...{ spaceId },
      });
    }
  }, [templateValue]);

  const handlePeriodicChange = (periodicValues: Pick<RecommendTemplateType, "periodic">) => {
    const stepIncrement = periodicValues.periodic === "REGULAR" ? 1 : 2;
    setTemplateValue((prevValues) => {
      return {
        ...prevValues,
        ...periodicValues,
        step: prevValues.step + stepIncrement,
      };
    });
  };

  const handlePeriodChange = (periodicValues: Pick<RecommendTemplateType, "period">) => {
    setTemplateValue((prevValues) => ({
      ...prevValues,
      ...periodicValues,
      step: prevValues.step + 1,
    }));
  };

  const handlePurposeChange = (purposeValues: Pick<RecommendTemplateType, "purpose">) => {
    setTemplateValue((prevValues) => ({
      ...prevValues,
      ...purposeValues,
      step: prevValues.step + 1,
    }));
  };

  const handleMoveToPrev = () => {
    if (templateValue.step === 0 && branchLayout === "A") {
      openFunnelModal({
        title: "",
        step: "retrospectCreate",
        contents: <RetrospectCreate />,
      });
      openActionModal({
        title: "",
        contents: <TemplateChoice />,
      });
      return;
    }
    if (templateValue.step === 0 && branchLayout === "B") {
      openFunnelModal({
        title: "템플릿 리스트",
        step: "listTemplate",
        contents: <TemplateList />,
      });
      return;
    }

    const { step, periodic } = templateValue;
    const shouldSkipTwoSteps = step === LAST_PAGE && periodic === "IRREGULAR";
    const decreaseAmount = shouldSkipTwoSteps ? 2 : 1;

    setTemplateValue((prev) => ({
      ...prev,
      step: prev.step - decreaseAmount,
    }));
  };

  if (isLoading) return <LoadingModal />;

  return (
    <>
      {templateValue.step <= LAST_PAGE && <ProgressBar curPage={templateValue.step + 1} lastPage={LAST_PAGE + 1} />}
      {
        {
          0: <Periodic onNext={handlePeriodicChange} onPrev={handleMoveToPrev} />,
          1: <Period onNext={handlePeriodChange} onPrev={handleMoveToPrev} />,
          2: <Purpose onNext={handlePurposeChange} onPrev={handleMoveToPrev} />,
        }[templateValue.step]
      }
    </>
  );
}
