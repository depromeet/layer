import { css } from "@emotion/react";
import { ChangeEvent, Fragment, useContext, useState } from "react";
import { Beforeunload } from "react-beforeunload";
import { useNavigate } from "react-router-dom";

import { AdvanceQuestionsNum, PhaseContext } from "@/app/write/RetrospectWritePage.tsx";
import { Button, ButtonProvider } from "@/component/common/button";
import { HeaderProvider } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { Portal } from "@/component/common/Portal";
import { ItemsButton } from "@/component/write/ItemsButton";
import { EntireListModal } from "@/component/write/modal/EntireListModal";
import { TemporarySaveModal } from "@/component/write/modal/TemporarySaveModal";
import { Confirm } from "@/component/write/phase/Confirm";
import { WAchievementTemplate } from "@/component/write/template/write/Achievement";
import { WDescriptiveTemplate } from "@/component/write/template/write/Descriptive";
import { WSatisfactionTemplate } from "@/component/write/template/write/Satisfaction";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";

export type Answer = {
  questionId: number;
  questionType: string;
  answer: string;
};

export function Write() {
  const navigate = useNavigate();
  const { data, incrementPhase, decrementPhase, phase, movePhase } = useContext(PhaseContext);
  const [answers, setAnswers] = useState<Answer[]>(
    data.questions.map((question) => ({
      questionId: question.order,
      questionType: question.questionType,
      answer: "",
    })),
  );
  const [satisfyIdx, setSatistfyIdx] = useState(-1);
  const [archievementIdx, setArchievementIdx] = useState(-1);
  const [isEntireModalOpen, setEntireModalOpen] = useState(false);
  const [isTemporarySaveModalOpen, setTemporarySaveModalOpen] = useState(false);
  const [isAnswerFilled, setIsAnswerFilled] = useState(false);
  const isComplete = data?.questions.length === phase;

  const updateAnswer = (questionId: number, newValue: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((answer) => (answer.questionId === questionId ? { ...answer, answer: newValue } : answer));
      const allFilled = updatedAnswers.every((answer) => answer.answer !== "");
      setIsAnswerFilled(allFilled);
      return updatedAnswers;
    });
  };

  const handleClick = (index: number, setIndex: (index: number) => void) => {
    setIndex(index);
    updateAnswer(phase, String(index));
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateAnswer(phase, e.target.value);
  };

  const handleClickSatistfy = (index: number) => handleClick(index, setSatistfyIdx);
  const handleClickAchivement = (index: number) => handleClick(index, setArchievementIdx);
  const handleModalClose = (type: string) => {
    if (type === "entire") {
      setEntireModalOpen(false);
    }

    if (type === "temporary-save") {
      setTemporarySaveModalOpen(false);
    }
  };

  // FIXME: 모달 컴포넌트 개발하기
  // useEffect(() => {
  //   console.log(answers);
  // }, [phase]);

  return (
    <Fragment>
      {isEntireModalOpen && (
        <Portal id={"question-list-root"}>
          <EntireListModal listData={data.questions} onClose={() => handleModalClose("entire")} />
        </Portal>
      )}
      {isTemporarySaveModalOpen && (
        <TemporarySaveModal
          title={"회고 작성을 멈출까요?"}
          content={"작성중인 회고는 임시저장 되어요"}
          listData={data.questions}
          confirm={() => handleModalClose("temporary-save")}
          quit={() => handleModalClose("temporary-save")}
        />
      )}
      <Beforeunload onBeforeunload={(event: BeforeUnloadEvent) => event.preventDefault()} />
      <DefaultLayout
        title={isComplete ? null : <ItemsButton onClick={() => setEntireModalOpen(true)} />}
        RightComp={
          isComplete ? (
            <span
              css={css`
                color: rgba(33, 37, 41, 0.7);
                font-size: 1.6rem;
              `}
              onClick={() => movePhase(data.questions.length)}
            >
              답변수정
            </span>
          ) : (
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
              마치기
            </button>
          )
        }
        LeftComp={<Icon icon={"ic_write_quit"} size={1.4} onClick={() => setTemporarySaveModalOpen(true)} />}
      >
        <div
          css={css`
            margin-top: 2rem;
            margin-bottom: 0.8rem;

            display: flex;
            flex-direction: column;
            row-gap: 0.8rem;
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
                          <HeaderProvider>
                            <HeaderProvider.Description
                              contents={"사전 질문"}
                              css={css`
                                color: #7e7c7c;
                              `}
                            />
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
                            <WSatisfactionTemplate index={satisfyIdx} onClick={handleClickSatistfy} />
                          </div>
                        </Fragment>
                      ),
                      range: (
                        <Fragment>
                          <HeaderProvider>
                            <HeaderProvider.Description
                              contents={"사전 질문"}
                              css={css`
                                color: #7e7c7c;
                              `}
                            />
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
                            <WAchievementTemplate answer={archievementIdx} onClick={handleClickAchivement} />
                          </div>
                        </Fragment>
                      ),
                      plain_text: (
                        <Fragment>
                          <HeaderProvider>
                            <HeaderProvider.Description
                              contents={`{${phase - (AdvanceQuestionsNum - 1)}}/${data.questions.length - AdvanceQuestionsNum}`}
                              css={css`
                                color: #7e7c7c;
                                font-weight: 500;
                                letter-spacing: 0.1rem;
                                font-size: 1.6rem;

                                .emphasis {
                                  color: black;
                                }
                              `}
                            />
                            <HeaderProvider.Subject contents={item.question} />
                          </HeaderProvider>
                          <WDescriptiveTemplate answer={answers[item.questionId].answer} onChange={(e) => handleChange(e)} />
                        </Fragment>
                      ),
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
            <Button colorSchema={"primary"} onClick={() => navigate("/write/complete")}>
              완료
            </Button>
          ) : (
            <Fragment>
              <Button colorSchema={"gray"} onClick={decrementPhase} disabled={phase === 0}>
                이전
              </Button>
              <Button colorSchema={"primary"} onClick={incrementPhase} disabled={phase === data.questions.length - 1}>
                다음
              </Button>
            </Fragment>
          )}
        </ButtonProvider>
      </DefaultLayout>
    </Fragment>
  );
}
