import { Typography } from "@/component/common/typography";
import { CAchievementTemplate, CDescriptiveTemplate, CSatisfactionTemplate } from "@/component/write/template/complete";
import { IndividualsAnswersType, IndividualsType } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

type AnalysisIndividualTabProps = {
  individuals: IndividualsType[];
};

export default function AnalysisIndividualTab({ individuals }: AnalysisIndividualTabProps) {
  const renderQuestionComponent = (answer: IndividualsAnswersType, index: number) => {
    const { questionContent, questionType, answerContent } = answer;

    switch (questionType) {
      case "number":
        return (
          <CSatisfactionTemplate
            key={index}
            question={questionContent}
            index={parseInt(answerContent)}
            customCss={css`
              margin-top: 0;
            `}
          />
        );
      case "range":
        return (
          <CAchievementTemplate
            key={index}
            question={questionContent}
            index={parseInt(answerContent)}
            customCss={css`
              margin-top: 0;
            `}
          />
        );
      case "plain_text":
        return (
          <CDescriptiveTemplate
            key={index}
            question={questionContent}
            answer={answerContent}
            customCss={css`
              margin-top: 0;
            `}
          />
        );
      default:
        return null;
    }
  };

  if (!individuals || individuals.length === 0) {
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
          분석할 개별 컨텐츠가 없어요
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
      {individuals.map((individual: IndividualsType, individualIndex: number) => (
        <article
          key={individualIndex}
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
            {individual.name}
          </Typography>
          <div
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
            {individual.answers.map((answer, index) => (
              <article key={index}>{renderQuestionComponent(answer, index)}</article>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
