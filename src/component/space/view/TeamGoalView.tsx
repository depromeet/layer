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
      <Icon icon="ic_folder" size="5.7rem" />
      <Spacing size={1.9} />
      <Typography variant="CAPTION" color="darkGray">
        회고 완료 후 실행목표를 설정해보세요.
      </Typography>
    </div>
  );
}
