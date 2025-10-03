import { ProgressBar } from "@/component/common/ProgressBar";
import { recommendTemplateState } from "@/store/retrospect/template/recommend/recommendAtom";
import { useAtom } from "jotai";
import { Periodic } from "./Periodic";
import { Period } from "./Period";
import { Purpose } from "./Purpose";
import { RecommendTemplateType } from "@/types/retrospectCreate/recommend";
import { useEffect } from "react";
import { useRequiredParams } from "@/hooks/useRequiredParams";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useActionModal } from "@/hooks/useActionModal";
import ChoiceTemplate from "..";
import { RetrospectCreate } from "@/app/desktop/retrospectCreate/RetrospectCreate";

type CreateSpaceProps = {
  onSubmit: (spaceValue: RecommendTemplateType & { spaceId: string }) => void;
};

const LAST_PAGE = 2;

export function RecommendTemplate({ onSubmit }: CreateSpaceProps) {
  const [templateValue, setTemplateValue] = useAtom(recommendTemplateState);
  const { spaceId } = useRequiredParams<{ spaceId: string }>();
  const { openFunnelModal } = useFunnelModal();
  const { openActionModal } = useActionModal();

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
    if (templateValue.step === 0) {
      openFunnelModal({
        title: "",
        step: "retrospectCreate",
        contents: <RetrospectCreate />,
      });
      openActionModal({
        title: "",
        contents: <ChoiceTemplate />,
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
