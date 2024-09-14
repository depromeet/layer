import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";

export function PendingAnalysisingComp({ pendingPeople }: { pendingPeople: number }) {
  return (
    <div
      css={css`
        height: 100dvh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <Icon icon="ic_clock" size={8} />
      <Spacing size={2} />
      <Typography
        variant="title18Bold"
        color="gray900"
        css={css`
          text-align: center;
        `}
      >
        {pendingPeople}명이 더 작성하면 <br />
        분석 확인이 가능해요!
      </Typography>
      <Spacing size={3} />
      <Typography variant="body16Medium" color="gray500">
        모두 회고를 제출한 후에 분석을 시작할게요
      </Typography>
    </div>
  );
}
