import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { createContext } from "react";

import { Icon } from "@/component/common/Icon";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Spacing } from "@/component/common/Spacing";
import { DueDate, MainInfo, CustomTemplate } from "@/component/retrospectCreate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { dueDateAtom, mainInfoAtom, questionsAtom } from "@/store/retrospect/retrospectCreate";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type RetrospectCreateContextState = {
  totalStepsCnt: number;
  goNext: ReturnType<typeof useMultiStepForm>["goNext"];
};

export const RetrospectCreateContext = createContext<RetrospectCreateContextState>({ totalStepsCnt: 0, goNext: () => {} });

export function RetrospectCreate() {
  const steps = ["mainInfo", "customTemplate", "dueDate"] as const;
  const themeMap: Record<(typeof steps)[number], keyof (typeof DESIGN_SYSTEM_COLOR)["themeBackground"]> = {
    mainInfo: "default",
    customTemplate: "gray",
    dueDate: "default",
  };
  const [mainInfo] = useAtom(mainInfoAtom);
  const [questions] = useAtom(questionsAtom);
  const [date] = useAtom(dueDateAtom);

  const { currentStep, goNext, goPrev, totalStepsCnt, currentStepNumber } = useMultiStepForm({ steps });

  const conditionalIncrementStep = () => {
    if (currentStep === "dueDate") {
      if (!date.date || !date.time) {
        return currentStepNumber - 1;
      }
    }
    return currentStepNumber;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*TODO - API 연동*/
  };

  return (
    <DefaultLayout LeftComp={<Icon icon={"ic_arrow_back"} onClick={goPrev} />} theme={themeMap[currentStep]}>
      <ProgressBar curPage={conditionalIncrementStep()} lastPage={totalStepsCnt} />
      <Spacing size={2.45} />
      <form
        onSubmit={handleSubmit}
        css={css`
          flex: 1 1 0;
        `}
      >
        <RetrospectCreateContext.Provider value={{ totalStepsCnt, goNext }}>
          {currentStep === "mainInfo" && <MainInfo />}
          {currentStep === "customTemplate" && <CustomTemplate />}
          {currentStep === "dueDate" && <DueDate />}
        </RetrospectCreateContext.Provider>
      </form>
    </DefaultLayout>
  );
}
