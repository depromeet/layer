import { createContext, useCallback } from "react";
import { ConfirmDefaultTemplate } from "../component/retrospectCreate/steps/ConfirmDefaultTemplate";
import MainInfo from "../component/retrospectCreate/steps/MainInfo";
import { ProgressBar } from "@/component/common/ProgressBar";
import { css } from "@emotion/react";
import DueDate from "../component/retrospectCreate/steps/DueDate";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { usePostRetrospectCreate } from "@/hooks/api/retrospect/create/usePostRetrospectCreate";
import { useLocation } from "react-router-dom";
import { useAtomValue } from "jotai";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { REQUIRED_QUESTIONS } from "@/component/retrospectCreate/customTemplate/questions.const";

const PAGE_STEPS = ["confirmTemplate", "mainInfo", "dueDate"] as const;
const CUSTOM_TEMPLATE_STEPS = ["confirmDefaultTemplate", "editQuestions", "confirmEditTemplate"] as const;

type UseMultiStepFormContextState<T extends (typeof CUSTOM_TEMPLATE_STEPS)[number] | (typeof PAGE_STEPS)[number]> = ReturnType<
  typeof useMultiStepForm<T>
>;

type RetrospectCreateContextState = UseMultiStepFormContextState<(typeof PAGE_STEPS)[number]> & {
  confirmQuitPage?: () => void;
  isMutatePending: boolean;
};

export const RetrospectCreateContext = createContext<RetrospectCreateContextState>({} as RetrospectCreateContextState);

export function RetrospectCreate() {
  const locationState = useLocation().state as { spaceId: number; templateId: number; saveTemplateId?: boolean };

  /* TODO 샐제 spaceId, templateId , saveTemplateId으로 교체 필요 */
  const { spaceId, templateId } = locationState || {
    spaceId: 540, // 기본값
    templateId: 10000, // 기본값
    saveTemplateId: undefined,
  };

  const retroCreateData = useAtomValue(retrospectCreateAtom);
  const { mutate: postRetrospectCreate, isPending } = usePostRetrospectCreate(spaceId);

  const pageState = useMultiStepForm({
    steps: PAGE_STEPS,
  });

  const handleSubmit = useCallback(() => {
    if (!pageState.isLastStep) return;
    const questionsWithRequired = REQUIRED_QUESTIONS.concat(retroCreateData.questions);
    postRetrospectCreate({
      spaceId,
      body: { ...retroCreateData, questions: questionsWithRequired, curFormId: templateId },
    });
  }, [retroCreateData.deadline]);

  return (
    <RetrospectCreateContext.Provider value={{ ...pageState, isMutatePending: isPending }}>
      <form
        css={css`
          display: flex;
          flex-direction: column;
          flex: 1 1 0;
          overflow-y: auto;
        `}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <ProgressBar curPage={pageState.currentStepIndex + 1} lastPage={pageState.totalStepsCnt} />
        {pageState.currentStep === "confirmTemplate" ? <ConfirmDefaultTemplate /> : null}
        {pageState.currentStep === "mainInfo" ? <MainInfo /> : null}
        {pageState.currentStep === "dueDate" ? <DueDate /> : null}
      </form>
    </RetrospectCreateContext.Provider>
  );
}
