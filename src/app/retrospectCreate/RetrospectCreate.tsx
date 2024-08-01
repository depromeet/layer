import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Spacing } from "@/component/common/Spacing";
import { DueDate, MainInfo, CustomTemplate, Start } from "@/component/retrospectCreate";
import { PATHS } from "@/config/paths";
import { usePostRetrospectCreate } from "@/hooks/api/retrospect/create/usePostRetrospectCreate";
import { useGetSpace } from "@/hooks/api/space/useGetSpace";
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
  //FIXME - location state type 분리하기
  const locationState = useLocation().state as { spaceId: number };
  const navigate = useNavigate();
  const {
    data: { formId },
  } = useGetSpace(locationState.spaceId);

  if (!locationState.spaceId) {
    throw new Error("location으로부터 spaceId를 읽을 수 없습니다.");
  }

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

  const handleSubmit = () => {
    const { spaceId } = locationState;
    postRetrospectCreate.mutate({
      spaceId,
      body: { ...retroCreateData },
    });
  };

  const { currentStep, goNext, goPrev, totalStepsCnt, currentStepIndex } = useMultiStepForm({
    steps,
    redirectPath: PATHS.completeRetrospectCreate(),
    handleSubmit,
  });

  const conditionalIncrementPage = () => {
    if (currentStep === "dueDate") {
      if (!retroCreateData.deadline) {
        return currentStepIndex - 1;
      }
    }
    return currentStepIndex;
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
      <RetrospectCreateContext.Provider value={{ totalStepsCnt, goNext }}>
        <form
          css={css`
            flex: 1 1 0;
          `}
        >
          {currentStep === "start" && <Start />}
          {currentStep === "mainInfo" && <MainInfo />}
          {currentStep === "customTemplate" && <CustomTemplate templateId={formId} />}
          {currentStep === "dueDate" && <DueDate />}
        </form>
      </RetrospectCreateContext.Provider>
    </DefaultLayout>
  );
}
