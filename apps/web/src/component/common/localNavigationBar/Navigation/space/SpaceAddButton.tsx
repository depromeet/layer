import { css } from "@emotion/react";

import { Icon } from "../../../Icon";
import { Typography } from "../../../typography";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export default function SpaceAddButton() {
  return (
    <button
      css={css`
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1.6rem;
        margin-top: 0.4rem;
        padding: 0.5rem 1rem;
        border-radius: 0.8rem;
        transition: background-color 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
        }
      `}
    >
      <div
        css={css`
          width: 2.4rem;
          height: 2.4rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
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
