import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { createContext, useCallback, useMemo } from "react";
import { Beforeunload } from "react-beforeunload";
import { useLocation, useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Spacing } from "@/component/common/Spacing";
import { DueDate, MainInfo, CustomTemplate, Start } from "@/component/retrospectCreate";
import { REQUIRED_QUESTIONS } from "@/component/retrospectCreate/customTemplate/questions.const";
import { PATHS } from "@/config/paths";
import { usePostRetrospectCreate } from "@/hooks/api/retrospect/create/usePostRetrospectCreate";
import { usePostRecentTemplateId } from "@/hooks/api/template/usePostRecentTemplateId";
import { useModal } from "@/hooks/useModal";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

const PAGE_STEPS = ["start", "mainInfo", "customTemplate", "dueDate"] as const;
const CUSTOM_TEMPLATE_STEPS = ["confirmDefaultTemplate", "editQuestions", "confirmEditTemplate"] as const;

type UseMultiStepFormContextState<T extends (typeof CUSTOM_TEMPLATE_STEPS)[number] | (typeof PAGE_STEPS)[number]> = ReturnType<
  typeof useMultiStepForm<T>
>;

type RetrospectCreateContextState = UseMultiStepFormContextState<(typeof PAGE_STEPS)[number]> & {
  confirmQuitPage: () => void;
  isMutatePending: boolean;
};
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

  const locationState = useLocation().state as { spaceId: number; templateId: number; saveTemplateId?: boolean };
  const { spaceId, templateId, saveTemplateId } = locationState;
  const { open, close: closeModal } = useModal();

  const retroCreateData = useAtomValue(retrospectCreateAtom);
  const resetRetroCreateData = useResetAtom(retrospectCreateAtom);
  const { mutate: postRetrospectCreate, isPending } = usePostRetrospectCreate(spaceId);
  const { mutate: postRecentTemplateId } = usePostRecentTemplateId(spaceId);

  const pageState = useMultiStepForm({
    steps: PAGE_STEPS,
  });

  const customState = useMultiStepForm({
    steps: CUSTOM_TEMPLATE_STEPS,
  });

  const conditionalStepIndex = useMemo(
    () => (pageState.currentStep === "dueDate" && !retroCreateData.deadline ? pageState.currentStepIndex - 1 : pageState.currentStepIndex),
    [pageState.currentStep, retroCreateData.deadline, pageState.currentStepIndex],
  );

  const conditionalGoPrev = useCallback(() => {
    const { currentStep: pageCurrentStep, goPrev: pageGoPrev } = pageState;
    const { currentStep: customCurrentStep, goPrev: customGoPrev } = customState;

    if (pageCurrentStep === "start" && saveTemplateId) {
      confirmQuitPage();
      return;
    }
    if (pageCurrentStep === "customTemplate" && customCurrentStep === "confirmEditTemplate") {
      customGoPrev();
      return;
    }
    pageGoPrev();
  }, [pageState.currentStep, customState.currentStep]);

  const confirmQuitPage = () => {
    open({
      title: "회고 진행을 중단하시겠어요?",
      contents: "선택한 템플릿은 임시저장되어요",
      onConfirm: quitPage,
      options: {
        buttonText: ["취소", "나가기"],
      },
    });
  };

  const quitPage = useCallback(() => {
    postRecentTemplateId({ formId: templateId, spaceId });
    closeModal();
    resetRetroCreateData();
    navigate(PATHS.spaceDetail(spaceId.toString()), { replace: true });
  }, []);

  const handleSubmit = useCallback(() => {
    if (!pageState.isLastStep) return;
    const questionsWithRequired = REQUIRED_QUESTIONS.concat(retroCreateData.questions);
    postRetrospectCreate({
      spaceId,
      body: { ...retroCreateData, questions: questionsWithRequired, curFormId: templateId },
    });
  }, [retroCreateData.deadline]);

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
        <RetrospectCreateContext.Provider value={{ ...pageState, confirmQuitPage, isMutatePending: isPending }}>
          <form
            css={css`
              flex: 1 1 0;
              overflow-y: auto;
              overflow-x: hidden;
              display: flex;
              flex-direction: column;
            `}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {pageState.currentStep === "start" && <Start />}
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
    </>
  );
}
