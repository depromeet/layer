import { css } from "@emotion/react";
import { ChangeEvent, Fragment, useContext, useEffect, useState } from "react";
import { AdvanceQuestionsNum, PhaseContext } from "..";
import { HeaderProvider } from "@/component/common/header";
import { WAchievementTemplate, WDescriptiveTemplate, WSatisfactionTemplate } from "@/component/write/template/write";
import { Answer } from "@/component/write/phase/Write";
import { QuestionBadge, QuestionLayout } from "./QuestionLayout";
import { QuestionNaviContainer } from "./QuestionNaviContainer";

export function WriteDialogContent() {
  const { data, phase } = useContext(PhaseContext);
  const [_, setIsAnswerFilled] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    if (data?.questions && data.questions.length > 0) {
      const initialAnswers = data.questions.map((question) => ({
        questionId: question.questionId,
        questionType: question.questionType,
        answerContent: "",
      }));

      setAnswers(initialAnswers);
    }
  }, [data]);

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

  const handleClickSatistfy = (index: number) => handleClick(index);
  const handleClickAchivement = (index: number) => handleClick(index);

  return (
    <div
      css={css`
        flex: 1;
        height: 100%;
      `}
    >
      {data?.questions.map((item) => {
        if (item.order !== phase || !answers[item.order]) {
          return null;
        }

        return (
          item.order === phase && (
            <Fragment key={item.questionId}>
              {
                {
                  number: (
                    <QuestionLayout
                      header={
                        <>
                          {/* ------ 사전질문 뱃지 + (이전, 다음) 버튼 컨테이너 UI ------ */}
                          <QuestionNaviContainer>
                            <QuestionBadge>사전질문 {AdvanceQuestionsNum - 1}</QuestionBadge>
                          </QuestionNaviContainer>

                          {/* ------ 현재 질문 ------ */}
                          <HeaderProvider.Subject contents={item.question} />
                        </>
                      }
                    >
                      <div
                        css={css`
                          min-width: 31.2rem;
                        `}
                      >
                        <WSatisfactionTemplate index={parseInt(answers[item.order].answerContent)} onClick={handleClickSatistfy} />
                      </div>
                    </QuestionLayout>
                  ),
                  range: (
                    <QuestionLayout
                      header={
                        <>
                          <QuestionNaviContainer>
                            <QuestionBadge>사전질문 {AdvanceQuestionsNum}</QuestionBadge>
                          </QuestionNaviContainer>
                          <HeaderProvider.Subject contents={item.question} />
                        </>
                      }
                    >
                      <div
                        css={css`
                          min-width: 33.4rem;
                        `}
                      >
                        <WAchievementTemplate answer={parseInt(answers[item.order].answerContent)} onClick={handleClickAchivement} />
                      </div>
                    </QuestionLayout>
                  ),
                  plain_text: (
                    <QuestionLayout
                      header={
                        <>
                          <QuestionNaviContainer>
                            <QuestionBadge>질문 {phase - 1}</QuestionBadge>
                          </QuestionNaviContainer>
                          <HeaderProvider.Subject contents={item.question} />
                        </>
                      }
                    >
                      <WDescriptiveTemplate answer={answers[item.order].answerContent} onChange={(e) => handleChange(e)} />
                    </QuestionLayout>
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
    </div>
  );
}
