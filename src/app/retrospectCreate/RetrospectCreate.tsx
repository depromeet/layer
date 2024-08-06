import { css } from "@emotion/react";
import { useAtom, useAtomValue } from "jotai";
import { createContext, useMemo, useState } from "react";
import { Beforeunload } from "react-beforeunload";
import { useLocation } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Portal } from "@/component/common/Portal";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Spacing } from "@/component/common/Spacing";
import { DueDate, MainInfo, CustomTemplate, Start } from "@/component/retrospectCreate";
import { REQUIRED_QUESTIONS } from "@/component/retrospectCreate/customTemplate/questions.const";
import { TemporarySaveModal } from "@/component/write/modal";
import { usePostRetrospectCreate } from "@/hooks/api/retrospect/create/usePostRetrospectCreate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { temporaryTemplateAtom } from "@/store/templateAtom";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type RetrospectCreateContextState = {
  totalStepsCnt: number;
  goNext: ReturnType<typeof useMultiStepForm>["goNext"];
  goPrev: ReturnType<typeof useMultiStepForm>["goPrev"];
};

export const RetrospectCreateContext = createContext<RetrospectCreateContextState>({
  totalStepsCnt: 0,
  goNext: () => {},
  goPrev: () => {},
});

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

  const locationState = useLocation().state as { spaceId: number; templateId: string };
  const { spaceId } = locationState;
  const [isTemporarySaveModalOpen, setIsTemporarySaveModalOpen] = useState(false);
  const [, setTemporaryTemplateAtom] = useAtom(temporaryTemplateAtom);

  const retroCreateData = useAtomValue(retrospectCreateAtom);
  const postRetrospectCreate = usePostRetrospectCreate(spaceId);

  const steps = ["start", "mainInfo", "customTemplate", "dueDate"] as const;

  const handleSubmit = () => {
    const questionsWithRequired = REQUIRED_QUESTIONS.concat(retroCreateData.questions);
    postRetrospectCreate.mutate({
      spaceId,
      body: { ...retroCreateData, questions: questionsWithRequired, curFormId: 10001 },
    });
  };

  const { currentStep, goNext, goPrev, totalStepsCnt, currentStepIndex } = useMultiStepForm({
    steps,
    handleSubmit,
  });

  const conditionalStepIndex = useMemo(
    () => (currentStep === "dueDate" && !retroCreateData.deadline ? currentStepIndex - 1 : currentStepIndex),
    [currentStep, retroCreateData.deadline],
  );

  return (
    <>
      <DefaultLayout
        LeftComp={
          <Icon
            icon={"ic_arrow_back"}
            onClick={
              currentStepIndex === 0
                ? () => {
                    setIsTemporarySaveModalOpen(true);
                  }
                : () => goPrev()
            }
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
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {currentStep === "start" && <Start onQuitPage={() => setIsTemporarySaveModalOpen(true)} />}
            {currentStep === "mainInfo" && <MainInfo />}
            {currentStep === "customTemplate" && <CustomTemplate />}
            {currentStep === "dueDate" && <DueDate />}
          </form>
        </RetrospectCreateContext.Provider>
      </DefaultLayout>
      <Beforeunload onBeforeunload={(event: BeforeUnloadEvent) => event.preventDefault()} />
      {isTemporarySaveModalOpen && (
        <Portal id="modal-root">
          <TemporarySaveModal
            title="회고 진행을 중단하시겠어요?"
            content="선택한 템플릿은 임시저장되어요"
            confirm={() => {
              setIsTemporarySaveModalOpen(false);
              /**FIXME - dummy template id */
              setTemporaryTemplateAtom((prev) => ({ ...prev, templateId: 10001 }));
              /**TODO - 스페이스 상세 페이지로 이동 */
            }}
            quit={() => {
              setIsTemporarySaveModalOpen(false);
            }}
          />
        </Portal>
      )}
    </>
  );
}
