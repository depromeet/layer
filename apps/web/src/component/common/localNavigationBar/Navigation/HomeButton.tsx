import { css } from "@emotion/react";

import { Icon } from "../../Icon";
import { Typography } from "../../typography";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

interface HomeButtonProps {
  isCollapsed: boolean;
}

export default function HomeButton({ isCollapsed }: HomeButtonProps) {
  return (
    <button
      css={css`
        width: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: ${isCollapsed ? "center" : "flex-start"};
          align-items: center;
          width: 100%;
          height: 3.9rem;
          gap: 1.6rem;
          padding: ${isCollapsed ? "0.6rem 0.4rem" : "0.4rem 0.8rem"};
          background-color: "transparent";
          border-radius: 0.8rem;
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;

          &:hover {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
      >
        <Icon icon="ic_home" size={1.4} style={{ cursor: "pointer" }} />

        {!isCollapsed && (
          <Typography variant="subtitle16SemiBold" color="gray900">
            홈
          </Typography>
        )}
      </div>
      <hr
        css={css`
          background-color: ${DESIGN_TOKEN_COLOR.gray200};
          border: none;
          height: 1px;
          margin: 0.8rem 0.4rem;
        `}
      />
    </button>
  );
}
