import { css } from "@emotion/react";
import { ChangeEvent, Fragment, useContext } from "react";
import { AdvanceQuestionsNum, PhaseContext } from "..";
import { HeaderProvider } from "@/component/common/header";
import { WAchievementTemplate, WDescriptiveTemplate, WSatisfactionTemplate } from "@/component/write/template/write";

import { QuestionBadge, QuestionLayout } from "./QuestionLayout";
import { QuestionNaviContainer } from "./QuestionNaviContainer";
import { Answer } from "@/component/write/phase/Write";
import { Confirm } from "../confirm";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

interface WriteDialogContentProps {
  answers: Answer[];
  isComplete: boolean;
  handleClickSatistfy: (index: number) => void;
  handleClickAchivement: (index: number) => void;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function WriteDialogContent({ answers, isComplete, handleClickSatistfy, handleClickAchivement, handleChange }: WriteDialogContentProps) {
  const { data, phase, title, introduction } = useContext(PhaseContext);

  return (
    <>
      <div
        css={css`
          flex: 1;
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
                          <WSatisfactionTemplate index={parseInt(answers[item.order]?.answerContent)} onClick={handleClickSatistfy} />
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
                          <WAchievementTemplate answer={parseInt(answers[item.order]?.answerContent)} onClick={handleClickAchivement} />
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
                        <WDescriptiveTemplate answer={answers[item.order]?.answerContent} onChange={(e) => handleChange(e)} />
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

        {isComplete && (
          <div
            css={css`
              width: 69.6rem;
              margin: 0 auto;
              overflow-y: auto;
            `}
          >
            <span
              css={css`
                display: inline-block;
                padding: 0.8rem 1rem;
                margin-bottom: 1.6rem;
                background-color: ${DESIGN_TOKEN_COLOR.gray100};
                border-radius: 0.8rem;
              `}
            >
              <Typography variant="subtitle14Bold" color="gray900">
                제출 전 확인
              </Typography>
            </span>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 0.8rem;

                &::after {
                  content: "";
                  width: 100%;
                  height: 0.1rem;
                  background-color: ${DESIGN_TOKEN_COLOR.gray200};
                  margin-top: 0.8rem;
                }
              `}
            >
              <Typography variant="heading24Bold" as="p">
                {title ?? ""}
              </Typography>
              <Typography variant="body15SemiBold" color="gray700" as="p">
                {introduction ?? ""}
              </Typography>
            </div>

            <Confirm answers={answers} />
          </div>
        )}
      </div>
    </>
  );
}
