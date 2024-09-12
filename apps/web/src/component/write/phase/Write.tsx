import { css } from "@emotion/react";
import { ChangeEvent, Fragment, useContext, useEffect, useRef, useState } from "react";
import { Beforeunload } from "react-beforeunload";
import { useNavigate } from "react-router-dom";

import { AdvanceQuestionsNum, PhaseContext } from "@/app/write/RetrospectWritePage.tsx";
import { Button, ButtonProvider } from "@/component/common/button";
import { HeaderProvider } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { LoadingModal } from "@/component/common/Modal/LoadingModal.tsx";
import { Portal } from "@/component/common/Portal";
import { ItemsButton } from "@/component/write/ItemsButton";
import { QuestionStatus } from "@/component/write/modal/component";
import { EntireListModal } from "@/component/write/modal/EntireListModal";
import { TemporarySaveModal } from "@/component/write/modal/TemporarySaveModal";
import { Confirm } from "@/component/write/phase/Confirm";
import { WAchievementTemplate } from "@/component/write/template/write/Achievement";
import { WDescriptiveTemplate } from "@/component/write/template/write/Descriptive";
import { WSatisfactionTemplate } from "@/component/write/template/write/Satisfaction";
import { PATHS } from "@/config/paths.ts";
import { useGetAnswers } from "@/hooks/api/write/useGetAnswers.ts";
import { useGetTemporaryQuestions } from "@/hooks/api/write/useGetTemporaryQuestions.ts";
import { useWriteQuestions } from "@/hooks/api/write/useWriteQuestions.ts";
import { useModal } from "@/hooks/useModal.ts";
import { useToast } from "@/hooks/useToast.ts";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";
import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

export type Answer = {
  questionId: number;
  questionType: string;
  answerContent: string;
};

type EditModeType = "EDIT" | "POST";

export function Write() {
  /** Util */
  const navigate = useNavigate();
  const { toast } = useToast();
  const { track } = useMixpanel();
  const { open } = useModal();

  /** Write Local State */
  const { data, incrementPhase, decrementPhase, phase, movePhase, spaceId, retrospectId } = useContext(PhaseContext);
  const [isEntireModalOpen, setEntireModalOpen] = useState(false);
  const [isTemporarySaveModalOpen, setTemporarySaveModalOpen] = useState(false);
  const [isAnswerFilled, setIsAnswerFilled] = useState(false);
  const [isTempData, setIsTempData] = useState(false);
  const isComplete = data?.questions.length === phase;
  const editMode = useRef<EditModeType>("POST");
  /** FIXME: 임시 저장한 데이터가 있을 경우, 변수를 통해 판별해서 모달 제공 */
  // const isTemp = useState(false);

  const initializeAnswers = () =>
    data.questions.map((question) => ({
      questionId: question.questionId,
      questionType: question.questionType,
      answerContent: "",
    }));

  const [prevAnswer, setPrevAnswers] = useState<Answer[]>(initializeAnswers);
  const [answers, setAnswers] = useState<Answer[]>(initializeAnswers);
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

  /** Data patching if you have temporary data */
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

  /**
   * NOTE: Tanstack Save Temp User Data
   * */
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

  /**
   * NOTE: Tanstack Post User Data
   * */
  const mutatePostData = () => {
    mutate(
      { data: answers, isTemporarySave: false, spaceId: spaceId, retrospectId: retrospectId, method: editMode.current },
      {
        onSuccess: () => {
          navigate("/write/complete", {
            state: {
              spaceId: spaceId,
              retrospectId: retrospectId,
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

  /**
   * NOTE: questionId는 작성 화면에서의 phase를 의미합니다.
   * 구조화된 데이터의 index와 현재의 phase를 비교하여 답변을 업데이트하여 상태 값을 관리합니다.
   * */
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

  const handleClickSatistfy = (index: number) => handleClick(index);
  const handleClickAchivement = (index: number) => handleClick(index);
  const handleModalClose = (type: string) => {
    if (type === "entire") setEntireModalOpen(false);
    if (type === "temporary-save") setTemporarySaveModalOpen(false);
    if (type === "temp-data") setIsTempData(false);
  };

  /**
   * Get (Data Get)
   * - temporaryDataLoading
   * - answerDataLoading
   *
   * Post (Data Save)
   * - isPending
   * */
  const renderLoadingModal = () => {
    if (temporaryDataLoading || answerDataLoading) return <LoadingModal />;
    if (isPending) return <LoadingModal purpose={"데이터를 저장하고 있어요"} />;
  };

  /**
   * Rendering Modal
   * - `EntireListModal`: Displays when the `isEntireModalOpen` flag is true.
   * - `TemporarySaveModal` for resuming work: Displays when `isTempData` is true and data loading flags (`temporaryDataLoading` and `answerDataLoading`) are false.
   * - `TemporarySaveModal` for saving work: Displays when `isTemporarySaveModalOpen` is true.
   * */
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
          {/* FIXME: 디자인 팀에 모달 문구 전달 후, 수정 예정 */}
          <TemporarySaveModal
            title={"회고 작성을 멈출까요?"}
            content={"나가기 클릭 시, 임시저장 하지 않은 글은\n따로 저장되지 않아요"}
            leftButtonText={"임시저장"}
            confirm={() => {
              handleModalClose("temporary-save");
              navigate("/");
            }}
            quit={mutateSaveTemporaryData}
          />
        </Portal>
      );
    }
  };

  return (
    <Fragment>
      {renderLoadingModal()}
      {renderModal()}
      <Beforeunload onBeforeunload={(event: BeforeUnloadEvent) => event.preventDefault()} />
      <DefaultLayout
        theme={isComplete ? "gray" : "default"}
        RightComp={
          isComplete ? (
            <span
              css={css`
                color: #6c9cfa;
                font-size: 1.6rem;
                cursor: pointer;
              `}
              onClick={() => movePhase(0)}
            >
              수정
            </span>
          ) : (
            <div
              css={css`
                display: flex;
                align-items: center;
                column-gap: 1.2rem;
              `}
            >
              <button
                css={css`
                  color: ${hasChanges() ? DESIGN_TOKEN_COLOR.gray600 : DESIGN_TOKEN_COLOR.gray400};
                  cursor: ${hasChanges() ? "pointer" : "not-allowed"};
                  transition: 0.4s all;
                  font-size: 1.6rem;
                `}
                onClick={mutateSaveTemporaryData}
                disabled={!hasChanges()}
              >
                저장
              </button>
              <div
                id="split"
                css={css`
                  height: 1.3rem;
                  border: solid 0.04rem ${DESIGN_TOKEN_COLOR.gray500};
                `}
              />
              <button
                css={css`
                  color: ${isAnswerFilled ? "#73a2ff" : "#CED2DA"};
                  cursor: ${isAnswerFilled ? "pointer" : "not-allowed"};
                  transition: 0.4s all;
                  font-size: 1.6rem;
                `}
                onClick={() => movePhase(data.questions.length)}
                disabled={!isAnswerFilled}
              >
                작성 완료
              </button>
            </div>
          )
        }
        LeftComp={
          <Icon
            icon={"ic_write_quit"}
            size={1.4}
            onClick={() => {
              if (hasChanges()) {
                setTemporarySaveModalOpen(true);
              } else {
                navigate(PATHS.home());
              }
            }}
          />
        }
      >
        <div
          css={css`
            margin-top: 2rem;
            margin-bottom: 0.8rem;

            display: flex;
            flex-direction: column;
            row-gap: 0.8rem;
            height: 100%;
          `}
        >
          {data?.questions.map((item) => {
            return (
              item.order === phase && (
                <Fragment key={item.questionId}>
                  {
                    {
                      number: (
                        <Fragment>
                          <HeaderProvider
                            onlyContainerStyle={css`
                              row-gap: 1.6rem;
                            `}
                          >
                            <ItemsButton onClick={() => setEntireModalOpen(true)}>사전질문 {AdvanceQuestionsNum - 1}</ItemsButton>
                            <HeaderProvider.Subject contents={item.question} />
                          </HeaderProvider>
                          <div
                            css={css`
                              width: 100%;
                              position: absolute;
                              top: 50%;
                              left: 50%;
                              transform: translate(-50%, -50%);
                            `}
                          >
                            <WSatisfactionTemplate index={parseInt(answers[item.order].answerContent)} onClick={handleClickSatistfy} />
                          </div>
                        </Fragment>
                      ),
                      range: (
                        <Fragment>
                          <HeaderProvider
                            onlyContainerStyle={css`
                              row-gap: 1.6rem;
                            `}
                          >
                            <ItemsButton onClick={() => setEntireModalOpen(true)}>사전질문 {AdvanceQuestionsNum}</ItemsButton>
                            <HeaderProvider.Subject contents={item.question} />
                          </HeaderProvider>
                          <div
                            css={css`
                              position: absolute;
                              top: 50%;
                              left: 50%;
                              transform: translate(-50%, -50%);
                              width: 100%;
                            `}
                          >
                            <WAchievementTemplate answer={parseInt(answers[item.order].answerContent)} onClick={handleClickAchivement} />
                          </div>
                        </Fragment>
                      ),
                      plain_text: (
                        <Fragment>
                          <HeaderProvider
                            onlyContainerStyle={css`
                              row-gap: 1.6rem;
                            `}
                          >
                            <ItemsButton onClick={() => setEntireModalOpen(true)}>
                              <QuestionStatus
                                currentPhase={item.order - (AdvanceQuestionsNum - 1)}
                                totalPhase={data.questions.length - AdvanceQuestionsNum}
                              />
                            </ItemsButton>

                            <HeaderProvider.Subject contents={item.question} />
                          </HeaderProvider>
                          <WDescriptiveTemplate answer={answers[item.order].answerContent} onChange={(e) => handleChange(e)} />
                        </Fragment>
                      ),
                      combobox: null,
                      card: null,
                      markdown: null,
                    }[item.questionType]
                  }
                </Fragment>
              )
            );
          })}

          {isComplete && (
            <Fragment>
              <HeaderProvider>
                <HeaderProvider.Subject contents={`중간발표 이후 회고`} />
                <HeaderProvider.Description
                  contents={`방향성 체크 및 팀 내 개선점 구축`}
                  css={css`
                    color: #7e7c7c;
                  `}
                />
              </HeaderProvider>
              <Confirm answers={answers} />
            </Fragment>
          )}
        </div>

        <ButtonProvider sort={"horizontal"}>
          {isComplete ? (
            <Button
              colorSchema={"primary"}
              onClick={() =>
                open({
                  title: "회고를 제출할까요?",
                  contents: "제출하고 난 뒤에는\n더 이상 회고를 수정할 수 없어요",
                  options: {
                    buttonText: ["취소", "제출하기"],
                  },
                  onConfirm: mutatePostData,
                })
              }
            >
              제출하기
            </Button>
          ) : (
            <Fragment>
              <Button colorSchema={"gray"} onClick={decrementPhase} disabled={phase === 0}>
                이전
              </Button>
              <Button colorSchema={"primary"} onClick={incrementPhase} disabled={phase === data.questions.length - 1 && !isAnswerFilled}>
                {phase === data.questions.length - 1 ? "완료" : "다음"}
              </Button>
            </Fragment>
          )}
        </ButtonProvider>
      </DefaultLayout>
    </Fragment>
  );
}
