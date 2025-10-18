import { createContext, useCallback } from "react";
import { ProgressBar } from "@/component/common/ProgressBar";
import { css } from "@emotion/react";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { usePostRetrospectCreate } from "@/hooks/api/retrospect/create/usePostRetrospectCreate";
import { useAtomValue } from "jotai";
import { retrospectCreateAtom } from "@/store/retrospect/retrospectCreate";
import { REQUIRED_QUESTIONS } from "@/component/retrospectCreate/customTemplate/questions.const";
import { retrospectInitialState } from "@/store/retrospect/retrospectInitial";
import { MainInfo } from "./steps/MainInfo";
import { DueDate } from "./steps/DueDate";
import { ConfirmDefaultTemplate } from "./steps/ConfirmDefaultTemplate";
import { PATHS } from "@layer/shared";
import { useNavigate } from "react-router-dom";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useToast } from "@/hooks/useToast";

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
  const navigate = useNavigate();
  const { closeFunnelModal } = useFunnelModal();
  const { toast } = useToast();
  const { spaceId, templateId } = useAtomValue(retrospectInitialState);
  const spaceIdNumber = Number(spaceId);
  const templateIdNumber = Number(templateId);

  const retroCreateData = useAtomValue(retrospectCreateAtom);
  const { mutate: postRetrospectCreate, isPending } = usePostRetrospectCreate(spaceIdNumber);

  const pageState = useMultiStepForm({
    steps: PAGE_STEPS,
  });

  const handleSubmit = useCallback(() => {
    if (!pageState.isLastStep) return;
    const questionsWithRequired = REQUIRED_QUESTIONS.concat(retroCreateData.questions);
    postRetrospectCreate(
      {
        spaceId: spaceIdNumber,
        body: { ...retroCreateData, questions: questionsWithRequired, curFormId: templateIdNumber },
      },
      {
        onSuccess: () => {
          navigate(PATHS.DesktopcompleteRetrospectCreate(String(spaceIdNumber)));
          closeFunnelModal();
          toast.success("회고가 생성되었어요!");
        },
      },
    );
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
