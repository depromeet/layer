import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

import { WriteDialogContent } from "./WriteDialogContent";
import { WriteDialogHeader } from "./WriteDialogHeader";
import { QuestionsOverview } from "./QuestionsOverview";
import { useToast } from "@/hooks/useToast";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { PhaseContext } from "..";
import { Answer } from "@/component/write/phase/Write";
import { useWriteQuestions } from "@/hooks/api/write/useWriteQuestions";
import { useGetTemporaryQuestions } from "@/hooks/api/write/useGetTemporaryQuestions";
import { useGetAnswers } from "@/hooks/api/write/useGetAnswers";
import { Portal } from "@/component/common/Portal";
import { EntireListModal, TemporarySaveModal } from "@/component/write/modal";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";
import { RetrospectWriteComplete } from "../complete";
import { PATHS } from "@layer/shared";
import { useNavigate } from "react-router-dom";

interface WriteDialogProps {
  isOverviewVisible: boolean;
  handleToggleOverview: () => void;
}

type EditModeType = "EDIT" | "POST";

export function WriteDialog({ isOverviewVisible, handleToggleOverview }: WriteDialogProps) {
  /** Util */
  const navigate = useNavigate();
  const { toast } = useToast();
  const { track } = useMixpanel();
  const { open: openDesktopModal } = useDesktopBasicModal();

  /** Write Local State */
  const { data, phase, spaceId, retrospectId } = useContext(PhaseContext);
  const [isEntireModalOpen, setEntireModalOpen] = useState(false);
  const [isTemporarySaveModalOpen, setTemporarySaveModalOpen] = useState(false);
  const [isAnswerFilled, setIsAnswerFilled] = useState(false);
  const [isTempData, setIsTempData] = useState(false);
  const editMode = useRef<EditModeType>("POST");
  const isComplete = data?.questions.length === phase;

  const [prevAnswer, setPrevAnswers] = useState<Answer[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [tempAnswer, setTempAnswer] = useState<Answer[]>([]);

  /** Data Fetching */
  const { mutate, isPending } = useWriteQuestions();
  const {
    data: temporaryData,
    isLoading: temporaryDataLoading,
    isSuccess: temporaryDataSuccess,
  } = useGetTemporaryQuestions({ spaceId: spaceId, retrospectId: retrospectId });

  const {
    data: answerData,
    isLoading: answerDataLoading,
    isSuccess: answerDataSuccess,
  } = useGetAnswers({ spaceId: spaceId, retrospectId: retrospectId });

  // data 로드 시 기본 초기화
  useEffect(() => {
    if (data?.questions && data.questions.length > 0 && answers.length === 0) {
      const initialAnswers = data.questions.map((question) => ({
        questionId: question.questionId,
        questionType: question.questionType,
        answerContent: "",
      }));

      setAnswers(initialAnswers);
      setPrevAnswers(initialAnswers);
    }
  }, [data]);

  /** 임시저장 내용이 있을 때  */
  useEffect(() => {
    if (temporaryDataSuccess && temporaryData) {
      setTempAnswer(
        temporaryData.answers.map((question) => ({
          questionId: question.questionId,
          questionType: question.questionType,
          answerContent: question.answerContent,
        })),
      );
      setIsTempData(true);
    }
  }, [temporaryDataLoading, temporaryDataSuccess, temporaryData]);

  useEffect(() => {
    if (answerDataSuccess && answerData) {
      const mappedAnswers = answerData.answers.map(({ questionId, questionType, answerContent }) => ({
        questionId,
        questionType,
        answerContent,
      }));
      editMode.current = "EDIT";
      setAnswers(mappedAnswers);
      setPrevAnswers(mappedAnswers);
    }
  }, [answerDataLoading, answerDataSuccess, answerData]);

  useEffect(() => {
    const allFilled = answers.every((answer) => answer.answerContent.trim() !== "");
    setIsAnswerFilled(allFilled);
  }, [answers]);

  const mutateSaveTemporaryData = () => {
    mutate(
      { data: answers, isTemporarySave: true, spaceId: spaceId, retrospectId: retrospectId },
      {
        onSuccess: () => {
          handleModalClose("temporary-save");
          toast.success("임시 저장이 완료되었어요!");
          setPrevAnswers(answers);
        },
      },
    );
  };

  const mutatePostData = () => {
    mutate(
      { data: answers, isTemporarySave: false, spaceId: spaceId, retrospectId: retrospectId, method: editMode.current },
      {
        onSuccess: () => {
          openDesktopModal({
            title: "",
            contents: <RetrospectWriteComplete />,
            options: {
              enableHeader: false,
              enableFooter: false,
            },
          });

          const plainTextAnswers = answers.filter(({ questionType }) => questionType === "plain_text");
          const answerLengths = plainTextAnswers.map(({ answerContent }) => answerContent.length);
          track("WRITE_DONE", {
            retrospectId,
            spaceId,
            answerLengths,
            averageAnswerLength: Math.round((answerLengths.reduce((acc, length) => acc + length, 0) / plainTextAnswers.length) * 100) / 100,
          });
        },
      },
    );
  };

  const updateAnswer = (questionId: number, newValue: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((answer, index) => (index === questionId ? { ...answer, answerContent: newValue } : answer));
      const allFilled = updatedAnswers.every((answer) => answer.answerContent.trim() !== "");
      setIsAnswerFilled(allFilled);
      return updatedAnswers;
    });
  };

  const handleClick = (index: number) => {
    updateAnswer(phase, String(index));
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateAnswer(phase, e.target.value);
  };

  const hasChanges = () => {
    return answers.some((answer, index) => answer.answerContent !== prevAnswer[index]?.answerContent);
  };

  const handleOpenTemporarySaveModal = () => {
    setTemporarySaveModalOpen(true);
  };

  function getCompletedAnswerCount() {
    return answers.filter((answer) => answer.answerContent.trim() !== "").length;
  }

  const handleClickSatistfy = (index: number) => handleClick(index);
  const handleClickAchivement = (index: number) => handleClick(index);
  const handleModalClose = (type: string) => {
    if (type === "entire") setEntireModalOpen(false);
    if (type === "temporary-save") setTemporarySaveModalOpen(false);
    if (type === "temp-data") setIsTempData(false);
  };

  const renderLoadingModal = () => {
    if (temporaryDataLoading || answerDataLoading) return <LoadingModal />;
    if (isPending) return <LoadingModal purpose={"데이터를 저장하고 있어요"} />;
  };

  const renderModal = () => {
    if (isEntireModalOpen) {
      return (
        <Portal id="modal-root">
          <EntireListModal onClose={() => handleModalClose("entire")} answers={answers} />
        </Portal>
      );
    }

    if (!temporaryDataLoading && !answerDataLoading && isTempData) {
      return (
        <Portal id="modal-root">
          <TemporarySaveModal
            title={"작성중인 회고가 있어요!\n이어서 작성할까요?"}
            content={"이전에 저장한 데이터를 가져올게요"}
            confirm={() => {
              setAnswers(tempAnswer);
              setPrevAnswers(tempAnswer);
              handleModalClose("temp-data");
            }}
            quit={() => {
              // 취소 시에도 기본 answers 초기화
              const initialAnswers = data.questions.map((question) => ({
                questionId: question.questionId,
                questionType: question.questionType,
                answerContent: "",
              }));
              setAnswers(initialAnswers);
              setPrevAnswers(initialAnswers);
              handleModalClose("temp-data");
            }}
            leftButtonText={"취소"}
            rightButtonText={"작성하기"}
          />
        </Portal>
      );
    }

    if (isTemporarySaveModalOpen) {
      return (
        <Portal id="modal-root">
          <TemporarySaveModal
            title={"회고 작성을 멈출까요?"}
            content={"나가기 클릭 시, 임시저장 하지 않은 글은\n따로 저장되지 않아요"}
            leftButtonText={"임시저장"}
            confirm={() => {
              handleModalClose("temporary-save");
              navigate(PATHS.DesktopcompleteRetrospectCreate(String(spaceId)));
            }}
            quit={mutateSaveTemporaryData}
          />
        </Portal>
      );
    }
  };

  return (
    <>
      {renderLoadingModal()}
      {renderModal()}
      <div
        css={css`
          display: flex;
          flex: 1;
          flex-direction: column;
          min-width: 85rem;
          height: 100vh;
          padding: 0 4rem 2.4rem 2.4rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          border-top-left-radius: 1.2rem;
          border-bottom-left-radius: 1.2rem;
          overflow-y: scroll;
        `}
      >
        {/* -------- 회고 작성 헤더 UI -------- */}
        <WriteDialogHeader
          isOverviewVisible={isOverviewVisible}
          isComplete={isComplete}
          handleToggleOverview={handleToggleOverview}
          hasChanges={hasChanges}
          handleOpenTemporarySaveModal={handleOpenTemporarySaveModal}
          onSubmitWriteDone={mutatePostData}
        />

        <div
          css={css`
            display: flex;
            flex: 1;
            height: 100%;
            margin-top: 2.4rem;
            padding-left: 5.6rem;
          `}
        >
          {/* -------- 회고 작성 내용 UI -------- */}
          <WriteDialogContent
            answers={answers}
            handleClickSatistfy={handleClickSatistfy}
            handleClickAchivement={handleClickAchivement}
            handleChange={handleChange}
            isComplete={isComplete}
          />

          {!isComplete && (
            <>
              {/* -------- 구분선 -------- */}
              <div
                css={css`
                  width: 0.1rem;
                  background-color: ${DESIGN_TOKEN_COLOR.opacity8};
                  margin: 0.6rem 2.8rem;
                `}
              />

              {/* -------- 회고 작성 질문 전체보기 UI -------- */}
              <QuestionsOverview
                hasChanges={hasChanges}
                onSaveTemporary={mutateSaveTemporaryData}
                isAnswerFilled={isAnswerFilled}
                getCompletedAnswerCount={getCompletedAnswerCount}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
