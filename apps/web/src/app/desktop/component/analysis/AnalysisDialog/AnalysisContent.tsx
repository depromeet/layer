import { Typography } from "@/component/common/typography";
import { CAchievementTemplate, CDescriptiveTemplate, CSatisfactionTemplate } from "@/component/write/template/complete";
import { AnswersType, getAnalysisResponse, QuestionsType } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

type AnalysisContentProps = {
  analysisData: getAnalysisResponse;
};

export default function AnalysisContent({ analysisData }: AnalysisContentProps) {
  const { questions } = analysisData;

  const renderQuestionComponent = (question: QuestionsType) => {
    const { questionType, answers } = question;

    return answers.map((answer: AnswersType, index: number) => {
      const { name, answerContent } = answer;

      switch (questionType) {
        case "number":
          return <CSatisfactionTemplate key={index} name={name} index={parseInt(answerContent)} />;
        case "range":
          return <CAchievementTemplate key={index} name={name} index={parseInt(answerContent)} />;
        case "plain_text":
          return <CDescriptiveTemplate key={index} name={name} answer={answerContent} />;
        default:
          return null;
      }
    });
  };

  return (
    <section
      css={css`
        flex: 1;
        display: flex;
        gap: 2rem;
        overflow-x: auto;
        overflow-y: auto;
        min-height: 80vh;
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
            margin-top: 2rem;
            padding: 2rem 1.6rem;
          `}
        >
          <Typography variant="body15Normal" color="gray900">
            {question.questionContent}
          </Typography>

          <article>{renderQuestionComponent(question)}</article>
        </article>
      ))}
    </section>
  );
}
