import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Spacing } from "@/component/common/Spacing";
import { DueDate, MainInfo, CustomTemplate, Start } from "@/component/retrospectCreate";
import { PATHS } from "@/config/paths";
import { usePostRetrospectCreate } from "@/hooks/api/retrospect/create/usePostRetrospectCreate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

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
      iconColor: DESIGN_SYSTEM_COLOR.white,
    },
    mainInfo: {
      background: "default",
      iconColor: DESIGN_SYSTEM_COLOR.black,
    },
    customTemplate: {
      background: "gray",
      iconColor: DESIGN_SYSTEM_COLOR.black,
    },
    dueDate: {
      background: "default",
      iconColor: DESIGN_SYSTEM_COLOR.black,
    },
  } as const;

  const [retroCreateData, _] = useAtom(retrospectCreateAtom);
  const postRetrospectCreate = usePostRetrospectCreate();

  const { currentStep, goNext, goPrev, totalStepsCnt, currentStepIndex } = useMultiStepForm({
    steps,
    redirectPath: PATHS.completeRetrospectCreate(),
  });

  const conditionalIncrementPage = () => {
    if (currentStep === "dueDate") {
      if (!retroCreateData.deadline) {
        return currentStepIndex - 1;
      }
    }
    return currentStepIndex;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const DUMMY_SPACE_ID = 0;
    postRetrospectCreate.mutate({
      spaceId: DUMMY_SPACE_ID,
      body: retroCreateData,
    });
  };

  return (
    <DefaultLayout
      LeftComp={
        <Icon icon={"ic_arrow_back"} onClick={() => (currentStepIndex === 0 ? navigate(-1) : goPrev())} color={themeMap[currentStep]["iconColor"]} />
      }
      theme={themeMap[currentStep]["background"]}
    >
      <div
        css={css`
          visibility: ${currentStep === "start" ? "hidden" : "visible"};
        `}
      >
        <ProgressBar curPage={conditionalIncrementPage()} lastPage={totalStepsCnt - 1} />
      </div>
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
