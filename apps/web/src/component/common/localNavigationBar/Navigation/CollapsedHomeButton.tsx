import { css } from "@emotion/react";

import { Icon } from "../../Icon";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export default function CollapsedHomeButton() {
  return (
    <button
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 3.2rem;
          height: 3.2rem;
          gap: 1.6rem;
          padding: 0.4rem;
          background-color: "transparent";
          border-radius: 0.8rem;
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;

          &:hover {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
      >
        <Icon icon="ic_home" size={1.4} />
      </div>
      <hr
        css={css`
          background-color: ${DESIGN_TOKEN_COLOR.gray200};
          width: 100%;
          border: none;
          height: 1px;
          padding-left: 1.2rem;
          padding-right: 1.2rem;
          margin: 1.2rem 0.4rem;
        `}
      />
    </button>
  );
}
