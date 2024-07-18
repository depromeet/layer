import { createContext } from "react";

import { Icon } from "@/component/common/Icon";
import { ProgressBar } from "@/component/common/ProgressBar";
import { DueDate, MainInfo, CustomTemplate } from "@/component/retrospectCreate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { DefaultLayout } from "@/layout/DefaultLayout";

type RetrospectCreateContextState = {
  totalStepsCnt: number;
  goNext: ReturnType<typeof useMultiStepForm>["goNext"];
};

export const RetrospectCreateContext = createContext<RetrospectCreateContextState>({ totalStepsCnt: 0, goNext: () => {} });

export function RetrospectCreate() {
  const steps = ["mainInfo", "customTemplate", "dueDate"] as const;
  const { currentStep, goNext, goPrev, totalStepsCnt, currentStepNumber } = useMultiStepForm({ steps });
  return (
    <DefaultLayout LeftComp={<Icon icon={"ic_arrow_back"} onClick={goPrev} />}>
      <ProgressBar curPage={currentStepNumber} lastPage={totalStepsCnt} />
      <form>
        <RetrospectCreateContext.Provider value={{ totalStepsCnt, goNext }}>
          {currentStep === "mainInfo" && <MainInfo />}
          {currentStep === "customTemplate" && <CustomTemplate />}
          {currentStep === "dueDate" && <DueDate />}
        </RetrospectCreateContext.Provider>
      </form>
    </DefaultLayout>
  );
}
