import { Typography } from "@/component/common/typography";
import { getAnalysisResponse } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { CAchievementTemplate, CDescriptiveTemplate, CSatisfactionTemplate } from "@/component/write/template/complete";

type AnalysisRetrospectTabProps = {
  analysisData: getAnalysisResponse;
};

export default function AnalysisRetrospectTab({ analysisData }: AnalysisRetrospectTabProps) {
  const individual = analysisData.individuals[0];

  if (!individual) {
    return <div>데이터가 없습니다.</div>;
  }

  // * 만족도와 목표달성률 추출
  const satisfactionAnswer = individual.answers.find((answer) => answer.questionType === "number" && answer.questionContent.includes("만족"));
  const goalAnswer = individual.answers.find((answer) => answer.questionType === "range" && answer.questionContent.includes("목표"));

  // * 텍스트 질문들 추출 (만족도, 목표달성률 제외)
  const textAnswers = individual.answers.filter((answer) => answer.questionType === "plain_text");

  const satisfactionScore = satisfactionAnswer ? parseInt(satisfactionAnswer.answerContent) : 0;
  const goalScore = goalAnswer ? parseInt(goalAnswer.answerContent) * 20 : 0;

  return (
    <section
      css={css`
        width: 100%;
        min-height: 59rem;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 3.2rem;
        overflow-y: auto;
      `}
    >
      {/* ---------- 진행상황 / 목표 달성률 ---------- */}
      <article
        css={css`
          display: flex;
          gap: 1.6rem;
        `}
      >
        <article
          css={css`
            flex-shrink: 0;
            width: 34rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            border-radius: 1.2rem;
            margin-top: 2rem;
            padding: 1.6rem;
          `}
        >
          <Typography variant="body15Normal" color="gray900">
            {individual.answers[0].questionContent}
          </Typography>

          <CSatisfactionTemplate
            index={satisfactionScore}
            customCss={css`
              height: 11rem;
            `}
          />
        </article>

        <section
          css={css`
            flex-shrink: 0;
            width: 34rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            border-radius: 1.2rem;
            margin-top: 2rem;
            padding: 1.6rem;
          `}
        >
          <Typography variant="body15Normal" color="gray900">
            {individual.answers[1].questionContent}
          </Typography>

          <CAchievementTemplate
            index={goalScore / 20}
            customCss={css`
              height: 11rem;
            `}
          />
        </section>
      </article>

      {/* ---------- 회고 질문들 ---------- */}
      <section>
        {textAnswers.map((answer, index) => (
          <article
            key={index}
            css={css`
              flex-shrink: 0;
              width: 69.6rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray100};
              border-radius: 1.2rem;
              margin-top: 2rem;
              padding: 2rem 1.6rem;
            `}
          >
            <Typography variant="body15Normal" color="gray900">
              {answer.questionContent}
            </Typography>

            <CDescriptiveTemplate key={index} answer={answer.answerContent} />
          </article>
        ))}
      </section>
    </section>
  );
}
