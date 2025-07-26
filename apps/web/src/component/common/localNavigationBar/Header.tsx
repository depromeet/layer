import { css } from "@emotion/react";

import { Icon } from "../Icon";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export default function Header() {
  return (
    <header
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2.2rem 1.2rem 1.8rem 2rem;
        border-bottom: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
      `}
    >
      <Icon icon="ic_logo" size={6.36} style={{ cursor: "pointer" }} />

      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 3.2rem;
          height: 3.2rem;
          padding: 0.7rem;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
          border-radius: 0.8rem;

          &:hover {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
      >
        <Icon icon="ic_arrow_back" size={1.6} />
      </div>
    </header>
  );
}
