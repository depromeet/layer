import { css } from "@emotion/react";

import { Icon } from "../../../Icon";
import { Typography } from "../../../typography";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export default function SpaceAddButton() {
  return (
    <button
      css={css`
        display: flex;
        align-items: center;
        gap: 1.6rem;
        height: 5.6rem;
        padding: 0.7rem 1rem;
        border-radius: 0.375rem;
        cursor: pointer;
      `}
    >
      <div
        css={css`
          width: 2.4rem;
          height: 2.4rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray200};
          padding: 0.5rem;
          border-radius: 0.8rem;
        `}
      >
        <Icon icon="ic_plus" size={1.4} color={DESIGN_TOKEN_COLOR.gray600} />
      </div>
      <Typography variant="body14Medium" color="gray600">
        스페이스 추가
      </Typography>
    </button>
  );
}
