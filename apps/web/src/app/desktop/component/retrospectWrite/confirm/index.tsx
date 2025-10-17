import { useContext } from "react";

import { Answer } from "@/component/write/phase/Write";
import { CAchievementTemplate, CDescriptiveTemplate, CSatisfactionTemplate } from "@/component/write/template/complete";
import { PhaseContext } from "..";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";

interface ResultLayoutProps {
  children: React.ReactNode;
  key?: number;
}

function ResultLayout({ children, key }: ResultLayoutProps) {
  return (
    <div
      key={key}
      css={css`
        width: 100%;
        min-height: 15.3rem;
        padding: 1.6rem;
        border-radius: 1.2rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray100};
      `}
    >
      {children}
    </div>
  );
}

type CompleteProps = {
  answers: Answer[];
};

export function Confirm({ answers }: CompleteProps) {
  const { data } = useContext(PhaseContext);

  // 사전 질문 (만족도, 달성률)
  const satisfactionQuestion = data.questions[0];
  const achievementQuestion = data.questions[1];

  // 일반 질문들 (plain_text)
  const mainQuestions = data.questions.slice(2);

  return (
    <>
      <div
        css={css`
          display: flex;
          align-items: stretch;
          gap: 1.6rem;
          margin-top: 2.4rem;
        `}
      >
        {/* --------- 진행상황 만족도 --------- */}
        <ResultLayout>
          <Typography variant="body15Normal">{satisfactionQuestion?.question}</Typography>
          {satisfactionQuestion && <CSatisfactionTemplate question={satisfactionQuestion.question} index={parseInt(answers[0]?.answerContent)} />}
        </ResultLayout>

        {/* --------- 목표 달성률 --------- */}
        <ResultLayout>
          <Typography variant="body15Normal">{achievementQuestion?.question}</Typography>
          {achievementQuestion && <CAchievementTemplate question={achievementQuestion.question} index={parseInt(answers[1]?.answerContent)} />}
        </ResultLayout>
      </div>

      {/* ---------- 메인 질문들 ---------- */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
          margin-top: 1.6rem;
          padding-bottom: 2.4rem;
        `}
      >
        {mainQuestions.map((mainQuestion, index) => (
          <ResultLayout key={index}>
            <Typography variant="body15Normal">{`${index + 1}. ${mainQuestion.question}`}</Typography>
            {achievementQuestion && <CDescriptiveTemplate answer={answers[mainQuestion.order]?.answerContent} />}
          </ResultLayout>
        ))}
      </div>
    </>
  );
}
