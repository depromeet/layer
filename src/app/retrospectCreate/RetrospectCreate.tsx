import { createContext } from "react";

import { Icon } from "@/component/common/Icon";
import { Start, DueDate, MainInfo, CustomTemplate } from "@/component/retrospectCreate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { DefaultLayout } from "@/layout/DefaultLayout";

type RetrospectCreateContextState = {
  totalStepsCnt: number;
  goNext: ReturnType<typeof useMultiStepForm>["goNext"];
};

export const RetrospectCreateContext = createContext<RetrospectCreateContextState>({ totalStepsCnt: 0, goNext: () => {} });

function BackButton({ onClick }: { onClick: ReturnType<typeof useMultiStepForm>["goPrev"] }) {
  return <Icon icon={"ic_arrow_back"} size={"1.6rem"} onClick={onClick} />;
}

export function RetrospectCreate() {
  const stepNames = ["start", "mainInfo", "dueDate", "customTemplate"] as const;
  const { currentStep, goNext, goPrev, totalStepsCnt } = useMultiStepForm({ stepNames });
  return (
    <DefaultLayout LeftComp={<BackButton onClick={goPrev} />}>
      <form>
        <RetrospectCreateContext.Provider value={{ totalStepsCnt, goNext }}>
          {currentStep === "start" && <Start />}
          {currentStep === "mainInfo" && <MainInfo curPage={1} />}
          {currentStep === "dueDate" && <DueDate curPage={2} />}
          {currentStep === "customTemplate" && <CustomTemplate curPage={3} />}
        </RetrospectCreateContext.Provider>
      </form>
    </DefaultLayout>
  );
}
