import { css } from "@emotion/react";
import { useAtom, useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { createContext, useCallback, useMemo, useState } from "react";
import { Beforeunload } from "react-beforeunload";
import { useLocation, useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Portal } from "@/component/common/Portal";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Spacing } from "@/component/common/Spacing";
import { DueDate, MainInfo, CustomTemplate, Start } from "@/component/retrospectCreate";
import { REQUIRED_QUESTIONS } from "@/component/retrospectCreate/customTemplate/questions.const";
import { TemporarySaveModal } from "@/component/write/modal";
import { PATHS } from "@/config/paths";
import { usePostRetrospectCreate } from "@/hooks/api/retrospect/create/usePostRetrospectCreate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { temporaryTemplateAtom } from "@/store/templateAtom";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

const PAGE_STEPS = ["start", "mainInfo", "customTemplate", "dueDate"] as const;
const CUSTOM_TEMPLATE_STEPS = ["confirmDefaultTemplate", "editQuestions", "confirmEditTemplate"] as const;

type UseMultiStepFormContextState<T extends (typeof CUSTOM_TEMPLATE_STEPS)[number] | (typeof PAGE_STEPS)[number]> = ReturnType<
  typeof useMultiStepForm<T>
>;

type RetrospectCreateContextState = UseMultiStepFormContextState<(typeof PAGE_STEPS)[number]>;
type CustomTemplateContextState = UseMultiStepFormContextState<(typeof CUSTOM_TEMPLATE_STEPS)[number]>;

export const RetrospectCreateContext = createContext<RetrospectCreateContextState>({} as RetrospectCreateContextState);

export const CustomTemplateContext = createContext<CustomTemplateContextState>({} as CustomTemplateContextState);

export function RetrospectCreate() {
  const navigate = useNavigate();
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
  const resetRetroCreateData = useResetAtom(retrospectCreateAtom);
  const postRetrospectCreate = usePostRetrospectCreate(spaceId);

  const handleSubmit = () => {
    const questionsWithRequired = REQUIRED_QUESTIONS.concat(retroCreateData.questions);
    postRetrospectCreate.mutate({
      spaceId,
      body: { ...retroCreateData, questions: questionsWithRequired, curFormId: 10001 },
    });
    resetRetroCreateData();
  };

  const pageState = useMultiStepForm({
    steps: PAGE_STEPS,
    handleSubmit,
  });

  const customState = useMultiStepForm({
    steps: CUSTOM_TEMPLATE_STEPS,
  });

  const conditionalStepIndex = useMemo(
    () => (pageState.currentStep === "dueDate" && !retroCreateData.deadline ? pageState.currentStepIndex - 1 : pageState.currentStepIndex),
    [pageState.currentStep, retroCreateData.deadline],
  );

  const conditionalGoPrev = useCallback(() => {
    const { currentStep: pageCurrentStep, goPrev: pageGoPrev } = pageState;
    const { currentStep: customCurrentStep, goPrev: customGoPrev } = customState;

    if (pageCurrentStep === "start") {
      setIsTemporarySaveModalOpen(true);
      return;
    }
    if (pageCurrentStep === "customTemplate" && customCurrentStep === "confirmEditTemplate") {
      customGoPrev();
      return;
    }
    pageGoPrev();
  }, [pageState.currentStep, customState.currentStep]);

  const quitPage = useCallback(() => {
    setIsTemporarySaveModalOpen(false);
    /**FIXME - dummy template id */
    setTemporaryTemplateAtom((prev) => ({ ...prev, templateId: 10001 }));
    resetRetroCreateData();
    navigate(PATHS.spaceDetail(spaceId.toString()));
  }, []);

  return (
    <>
      <DefaultLayout
        LeftComp={<Icon icon={"ic_arrow_back"} onClick={conditionalGoPrev} color={themeMap[pageState.currentStep]["iconColor"]} />}
        theme={themeMap[pageState.currentStep]["background"]}
      >
        <div
          css={css`
            visibility: ${pageState.currentStep === "start" ? "hidden" : "visible"};
          `}
        >
          <ProgressBar curPage={conditionalStepIndex} lastPage={pageState.totalStepsCnt - 1} />
        </div>
        <Spacing size={2.9} />
        <RetrospectCreateContext.Provider value={pageState}>
          <form
            css={css`
              flex: 1 1 0;
              overflow-y: auto;
              display: flex;
              flex-direction: column;
            `}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {pageState.currentStep === "start" && <Start onQuitPage={quitPage} />}
            {pageState.currentStep === "mainInfo" && <MainInfo />}
            {pageState.currentStep === "customTemplate" && (
              <CustomTemplateContext.Provider value={customState}>
                <CustomTemplate />
              </CustomTemplateContext.Provider>
            )}
            {pageState.currentStep === "dueDate" && <DueDate />}
          </form>
        </RetrospectCreateContext.Provider>
      </DefaultLayout>
      <Beforeunload onBeforeunload={(event: BeforeUnloadEvent) => event.preventDefault()} />
      {isTemporarySaveModalOpen && (
        <Portal id="modal-root">
          <TemporarySaveModal
            title="회고 진행을 중단하시겠어요?"
            content="선택한 템플릿은 임시저장되어요"
            confirm={quitPage}
            quit={() => {
              setIsTemporarySaveModalOpen(false);
            }}
          />
        </Portal>
      )}
    </>
  );
}
