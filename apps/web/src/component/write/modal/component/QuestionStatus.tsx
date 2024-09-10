import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";

type QuestionStatusProps = {
  currentPhase: number;
  totalPhase: number;
};

export function QuestionStatus({ currentPhase, totalPhase }: QuestionStatusProps) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        column-gap: 0.4rem;
      `}
    >
      <Typography variant={"subtitle16SemiBold"} color={"gray900"}>
        질문 {currentPhase}
      </Typography>
      <Typography variant={"subtitle16SemiBold"} color={"gray500"}>
        / {totalPhase}
      </Typography>
    </div>
  );
}
