import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

export function TeamGoalView() {
  return (
    <div
      css={css`
        width: 100%;
        height: 16.9rem;
        background-color: ${DESIGN_SYSTEM_COLOR.white};
        border: 1px solid rgba(33, 37, 41, 0.08);
        border-radius: 1.2rem;
        padding: 1.6rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
        `}
      >
        <Typography variant="B2_SEMIBOLD">실행목표</Typography>
        <Typography variant="B2_MEDIUM" color="darkGray">
          더보기
        </Typography>
      </div>
      <Spacing size={1.0} />
      <div
        css={css`
          width: 4rem;
          height: 4rem;
          background-color: ${DESIGN_SYSTEM_COLOR.grey200};
          border-radius: 0.8rem;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <Icon
          icon="ic_plus"
          size="1.5rem"
          color="rgba(169, 175, 187, 1);
"
        />
      </div>
      <Spacing size={1.6} />
      <Typography variant="B2_MEDIUM" color="darkGray">
        실행목표를 설정해보세요.
      </Typography>
    </div>
  );
}
