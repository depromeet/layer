import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Spacing } from "@/component/common/Spacing";
import { DueDate, MainInfo, CustomTemplate, Start } from "@/component/retrospectCreate";
import { PATHS } from "@/config/paths";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { dueDateAtom, mainInfoAtom, questionsAtom } from "@/store/retrospect/retrospectCreate";

type RetrospectCreateContextState = {
  totalStepsCnt: number;
  goNext: ReturnType<typeof useMultiStepForm>["goNext"];
};

export const RetrospectCreateContext = createContext<RetrospectCreateContextState>({ totalStepsCnt: 0, goNext: () => {} });

export function RetrospectCreate() {
  const navigate = useNavigate();
  const steps = ["start", "mainInfo", "customTemplate", "dueDate"] as const;
  const themeMap = {
    start: {
      background: "dark",
      iconColor: "#fff",
    },
    mainInfo: {
      background: "default",
      iconColor: "#000",
    },
    customTemplate: {
      background: "gray",
      iconColor: "#000",
    },
    dueDate: {
      background: "default",
      iconColor: "#000",
    },
  } as const;

  // const [mainInfo] = useAtom(mainInfoAtom);
  // const [questions] = useAtom(questionsAtom);
  const [date] = useAtom(dueDateAtom);

  const { currentStep, goNext, goPrev, totalStepsCnt, currentStepIndex } = useMultiStepForm({
    steps,
    redirectPath: PATHS.completeRetrospectCreate(),
  });

  const conditionalIncrementPage = () => {
    if (currentStep === "dueDate") {
      if (!date.date || !date.time) {
        return currentStepIndex;
      }
    }
    return currentStepIndex;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*TODO - API 연동*/
  };

  return (
    <DefaultLayout
      LeftComp={
        <Icon icon={"ic_arrow_back"} onClick={() => (currentStepIndex === 0 ? navigate(-1) : goPrev())} color={themeMap[currentStep]["iconColor"]} />
      }
      theme={themeMap[currentStep]["background"]}
    >
      {currentStep !== "start" && <ProgressBar curPage={conditionalIncrementPage()} lastPage={totalStepsCnt - 1} />}
      <Spacing size={2.9} />
      <form
        onSubmit={handleSubmit}
        css={css`
          flex: 1 1 0;
        `}
      >
        <RetrospectCreateContext.Provider value={{ totalStepsCnt, goNext }}>
          {currentStep === "start" && <Start />}
          {currentStep === "mainInfo" && <MainInfo />}
          {currentStep === "customTemplate" && <CustomTemplate />}
          {currentStep === "dueDate" && <DueDate />}
        </RetrospectCreateContext.Provider>
      </form>
    </DefaultLayout>
  );
}
