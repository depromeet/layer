import { createContext } from "react";

import { Start, DueDate, MainInfo, CustomTemplate } from "@/component/retrospectCreate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { DefaultLayout } from "@/layout/DefaultLayout";

type RetrospectCreateContextState = {
  totalStepsCnt: number;
  goNext: ReturnType<typeof useMultiStepForm>["goNext"];
  goPrev: ReturnType<typeof useMultiStepForm>["goPrev"];
};

export const RetrospectCreateContext = createContext<RetrospectCreateContextState>({ totalStepsCnt: 0, goNext: () => {}, goPrev: () => {} });

export function RetrospectCreate() {
  const { currentStep, goNext, goPrev, totalStepsCnt } = useMultiStepForm({ stepNames: ["start", "mainInfo", "dueDate", "customTemplate"] as const });
  return (
    <DefaultLayout>
      <form>
        <RetrospectCreateContext.Provider value={{ totalStepsCnt, goNext, goPrev }}>
          {currentStep === "start" && <Start />}
          {currentStep === "mainInfo" && <MainInfo curPage={1} />}
          {currentStep === "dueDate" && <DueDate curPage={2} />}
          {currentStep === "customTemplate" && <CustomTemplate curPage={3} />}
        </RetrospectCreateContext.Provider>
      </form>
    </DefaultLayout>
  );
}
