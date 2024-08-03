import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type SpaceCountViewProps = {
  memberCount: number | undefined;
  layerCount: number | undefined;
};

export function SpaceCountView({ memberCount, layerCount }: SpaceCountViewProps) {
  return (
    <div
      css={css`
        width: 100%;
        height: 7.2rem;
        background-color: ${DESIGN_SYSTEM_COLOR.white};
        border: 1px solid rgba(33, 37, 41, 0.08);
        border-radius: 1.2rem;
        padding: 1.6rem 2.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 1.2rem;
          align-items: center;
        `}
      >
        <Icon icon="ic_earth" size={2.8} color="#6C9CFA" />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
          `}
        >
          <Typography variant="CAPTION">쌓인 회고</Typography>
          <Typography variant="B2_SEMIBOLD">{layerCount}개</Typography>
        </div>
      </div>

      <div
        css={css`
          width: 1px;
          height: 2.6rem;
          background-color: #dee2e6;
        `}
      />
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Icon icon="ic_team" size={2.9} />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            margin-left: 1.5rem;
            margin-right: 1rem;
          `}
        >
          <Typography variant="CAPTION">팀원</Typography>
          <Typography variant="B2_SEMIBOLD">{memberCount}명</Typography>
        </div>
        <Icon icon="ic_after" size={1.6} />
      </div>
    </div>
  );
}
