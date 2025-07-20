import { css } from "@emotion/react";

import { Icon } from "../../../Icon";
import { Typography } from "../../../typography";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

const IS_CURRENT_SPACE = false;

export default function SpaceItem() {
  return (
    <li
      css={css`
        display: flex;
        align-items: center;
        gap: 1rem;
        height: 5.6rem;
        background-color: ${IS_CURRENT_SPACE ? DESIGN_TOKEN_COLOR.gray100 : "transparent"};
        padding: 0.7rem 0.4rem;
        border-radius: 0.375rem;
        cursor: pointer;
      `}
    >
      <div
        css={css`
          width: 3.6rem;
          height: 3.6rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray200};
          padding: 0.6rem;
          border-radius: 50%;
        `}
      >
        <Icon icon="ic_management_white" size={2.4} />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          flex: 0.9;
          min-width: 0;
        `}
      >
        <Typography
          variant="subtitle14SemiBold"
          color="gray900"
          css={css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          `}
        >
          스페이스 이름 1
        </Typography>
        <Typography
          variant="body12Medium"
          color="gray600"
          css={css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          `}
        >
          스페이스 설명
        </Typography>
      </div>
    </li>
  );
}
