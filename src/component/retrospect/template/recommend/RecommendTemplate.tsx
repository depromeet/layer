import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Period } from "@/component/retrospect/template/recommend/Period";
import { Periodic } from "@/component/retrospect/template/recommend/Periodic";
import { Purpose } from "@/component/retrospect/template/recommend/Purpose";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { recommendTemplateState } from "@/store/retrospect/template/recommend/recommendAtom";
import { RecommendTemplateType } from "@/types/retrospectCreate/recommend";

type CreateSpaceProps = {
  onSubmit: (spaceValue: RecommendTemplateType & { spaceId: string }) => void;
};

const LAST_PAGE = 2;

export function RecommendTemplate({ onSubmit }: CreateSpaceProps) {
  const { spaceId } = useLocation().state as { spaceId: string };
  const navigate = useNavigate();
  const [templateValue, setTemplateValue] = useAtom(recommendTemplateState);
  const resetTemplateValue = useResetAtom(recommendTemplateState);

  useEffect(() => {
    if (templateValue.step === LAST_PAGE + 1) {
      onSubmit({
        ...templateValue,
        ...{ spaceId },
      });
      resetTemplateValue();
    }
  }, [templateValue]);

  const handlePeriodicChange = (periodicValues: Pick<RecommendTemplateType, "periodic">) => {
    setTemplateValue((prevValues) => {
      const stepIncrement = periodicValues.periodic === "REGULAR" ? 1 : 2;
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

  const handleBack = useCallback(() => {
    templateValue.step > 0
      ? setTemplateValue((prevValues) => ({
          ...prevValues,
          step: prevValues.step - 1,
        }))
      : navigate(`/space/${spaceId}`);
  }, [navigate, setTemplateValue, spaceId, templateValue.step]);

  return (
    <DefaultLayout
      LeftComp={
        <Icon
          size={2.4}
          icon="ic_arrow_left"
          color={"default"}
          css={css`
            cursor: pointer;
          `}
          onClick={handleBack}
        />
      }
      theme={"default"}
    >
      <ProgressBar curPage={templateValue.step + 1} lastPage={LAST_PAGE + 1} />
      {
        {
          0: <Periodic onNext={handlePeriodicChange} />,
          1: <Period onNext={handlePeriodChange} />,
          2: <Purpose onNext={handlePurposeChange} />,
        }[templateValue.step]
      }
    </DefaultLayout>
  );
}
