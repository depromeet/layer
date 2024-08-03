import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { createContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Spacing } from "@/component/common/Spacing";
import { Toast } from "@/component/common/Toast";
import { DueDate, MainInfo, CustomTemplate, Start } from "@/component/retrospectCreate";
import { PATHS } from "@/config/paths";
import { usePostRetrospectCreate } from "@/hooks/api/retrospect/create/usePostRetrospectCreate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { useToast } from "@/hooks/useToast";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type RetrospectCreateContextState = {
  totalStepsCnt: number;
  goNext: ReturnType<typeof useMultiStepForm>["goNext"];
  goPrev: ReturnType<typeof useMultiStepForm>["goPrev"];
};

export const RetrospectCreateContext = createContext<RetrospectCreateContextState>({ totalStepsCnt: 0, goNext: () => {}, goPrev: () => {} });

export function RetrospectCreate() {
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

  const navigate = useNavigate();
  const locationState = useLocation().state as { spaceId: number; templateId: number };
  const { spaceId, templateId } = locationState;
  const { toast } = useToast();
  if (!spaceId) {
    toast.error("스페이스 정보를 찾을 수 없습니다.");
    navigate(PATHS.retrospectView());
  }
  if (!templateId) {
    toast.error("템플릿을 먼저 선택해주세요.");
    navigate(PATHS.space(spaceId));
  }

  const retroCreateData = useAtomValue(retrospectCreateAtom);
  const postRetrospectCreate = usePostRetrospectCreate(spaceId);

  const steps = ["start", "mainInfo", "customTemplate", "dueDate"] as const;

  const handleSubmit = () => {
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

  const conditionalStepIndex = useMemo(
    () => (currentStep === "dueDate" && !retroCreateData.deadline ? currentStepIndex - 1 : currentStepIndex),
    [currentStep, retroCreateData.deadline],
  );

  return (
    <>
      <Toast />
      <DefaultLayout
        LeftComp={
          <Icon
            icon={"ic_arrow_back"}
            onClick={() => (currentStepIndex === 0 ? navigate(-1) : goPrev())}
            color={themeMap[currentStep]["iconColor"]}
          />
        }
        theme={themeMap[currentStep]["background"]}
      >
        <div
          css={css`
            visibility: ${currentStep === "start" ? "hidden" : "visible"};
          `}
        >
          <ProgressBar curPage={conditionalStepIndex} lastPage={totalStepsCnt - 1} />
        </div>
        <Spacing size={2.9} />
        <RetrospectCreateContext.Provider value={{ totalStepsCnt, goNext, goPrev }}>
          <form
            css={css`
              flex: 1 1 0;
            `}
          >
            {currentStep === "start" && <Start />}
            {currentStep === "mainInfo" && <MainInfo />}
            {currentStep === "customTemplate" && <CustomTemplate templateId={templateId} />}
            {currentStep === "dueDate" && <DueDate />}
          </form>
        </RetrospectCreateContext.Provider>
      </DefaultLayout>
    </>
  );
}
