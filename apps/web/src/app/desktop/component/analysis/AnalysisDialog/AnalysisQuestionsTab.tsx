import { Typography } from "@/component/common/typography";
import { CAchievementTemplate, CDescriptiveTemplate, CSatisfactionTemplate } from "@/component/write/template/complete";
import { AnswersType, QuestionsType } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

type AnalysisQuestionsTabProps = {
  questions: QuestionsType[];
  reactionProps: { spaceId: number; retrospectId: number } | null;
};

function QuestionAnswers({
  question,
  questionIndex,
  reactionProps,
}: { question: QuestionsType; questionIndex: number } & Pick<AnalysisQuestionsTabProps, "reactionProps">) {
  const { questionType, answers } = question;

  return (
    <>
      {answers.map((answer: AnswersType, index: number) => {
        const { name, answerContent } = answer;

        const answerReactionProps = reactionProps
          ? { ...reactionProps, answerId: answer.answerId, showEmptyTooltip: questionIndex === 0 && index === 0 }
          : undefined;

        switch (questionType) {
          case "number":
            return (
              <CSatisfactionTemplate
                key={answer.answerId}
                name={name}
                index={parseInt(answerContent)}
                reactionProps={answerReactionProps}
                customCss={css`
                  margin-top: 0;
                  min-height: initial;
                `}
              />
            );
          case "range":
            return (
              <CAchievementTemplate
                key={answer.answerId}
                name={name}
                index={parseInt(answerContent)}
                reactionProps={answerReactionProps}
                customCss={css`
                  margin-top: 0;
                  min-height: initial;
                `}
              />
            );
          case "plain_text":
            return (
              <CDescriptiveTemplate
                key={answer.answerId}
                name={name}
                answer={answerContent}
                reactionProps={answerReactionProps}
                customCss={css`
                  margin-top: 0;
                  min-height: initial;
                `}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

export default function AnalysisQuestionsTab({ questions, reactionProps }: AnalysisQuestionsTabProps) {
  if (!questions || questions.length === 0) {
    return (
      <section
        css={css`
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80dvh;
        `}
      >
        <Typography variant="title20Bold" color="gray500">
          분석할 질문이 없어요
        </Typography>
      </section>
    );
  }

  return (
    <section
      css={css`
        flex: 1;
        display: flex;
        gap: 2rem;
        overflow-x: auto;
        height: calc(100% - 12.8rem);
        padding-top: 2rem;
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
      `}
    >
      {questions.map((question: QuestionsType, questionIndex: number) => (
        <article
          key={questionIndex}
          css={css`
            flex-shrink: 0;
            width: 34rem;
            height: 100%;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            border-radius: 1.2rem;
            padding-inline: 1.6rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
            box-sizing: border-box;
          `}
        >
          <Typography variant="body15Normal" color="gray900">
            {question.questionContent}
          </Typography>
          <article
            css={css`
              overflow-y: auto;
              height: 100%;
              display: flex;
              flex-direction: column;
              row-gap: 1.6rem;
              padding-top: 2rem;
              padding-bottom: 2rem;
              scroll-behavior: smooth;
              scroll-snap-type: y mandatory;
            `}
          >
            <QuestionAnswers question={question} questionIndex={questionIndex} reactionProps={reactionProps} />
          </article>
        </article>
      ))}
    </section>
  );
}
