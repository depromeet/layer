import { Typography } from "@/component/common/typography";
import { CAchievementTemplate, CDescriptiveTemplate, CSatisfactionTemplate } from "@/component/write/template/complete";
import { IndividualsAnswersType, IndividualsType } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

type AnalysisIndividualTabProps = {
  individuals: IndividualsType[];
};

export default function AnalysisIndividualTab({ individuals }: AnalysisIndividualTabProps) {
  console.log("individuals", individuals);

  const renderQuestionComponent = (answer: IndividualsAnswersType, index: number) => {
    const { questionContent, questionType, answerContent } = answer;

    switch (questionType) {
      case "number":
        return <CSatisfactionTemplate key={index} question={questionContent} index={parseInt(answerContent)} />;
      case "range":
        return <CAchievementTemplate key={index} question={questionContent} index={parseInt(answerContent)} />;
      case "plain_text":
        return <CDescriptiveTemplate key={index} question={questionContent} answer={answerContent} />;
      default:
        return null;
    }
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
      {individuals.map((individual: IndividualsType, individualIndex: number) => (
        <article
          key={individualIndex}
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
            {individual.name}
          </Typography>

          {individual.answers.map((answer, index) => (
            <article key={index}>{renderQuestionComponent(answer, index)}</article>
          ))}
        </article>
      ))}
    </section>
  );
}
