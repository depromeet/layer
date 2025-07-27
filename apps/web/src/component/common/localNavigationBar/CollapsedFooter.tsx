import { css } from "@emotion/react";

import { Icon } from "../Icon";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export default function CollapsedFooter() {
  return (
    <footer
      css={css`
        border-top: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
        padding: 0.4rem 2rem 1.2rem 2rem;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        gap: 0.8rem;
      `}
    >
      {/* ---------- 프로필 이미지 ---------- */}
      <button
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: auto;
          height: 3.2rem;
          gap: 1.2rem;
          padding: 0rem 0.4rem;
          border: none;
          background: transparent;
          border-radius: 0.8rem;
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;

          &:focus {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }

          &:hover {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
      >
        <Icon icon="basicProfile" size={2.4} />
      </button>

      {/* ---------- 헬프 센터 버튼 ---------- */}
      <button
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 3.2rem;
          height: 3.2rem;
          gap: 0.6rem;
          padding: 0rem 0.4rem;
          border: none;
          background: transparent;
          border-radius: 0.8rem;
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;

          &:focus {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }

          &:hover {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
      >
        <Icon icon="ic_help" size={1.8} />
      </button>
    </footer>
  );
}
