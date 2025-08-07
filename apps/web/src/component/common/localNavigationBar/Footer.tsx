import { css } from "@emotion/react";

import { Icon } from "../Icon";
import { Typography } from "../typography";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export default function Footer() {
  return (
    <footer
      css={css`
        border-top: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
        padding: 0.6rem 2rem;
        display: flex;
        align-items: center;
      `}
    >
      {/* ---------- 프로필 이미지/이름 ---------- */}
      <button
        css={css`
          display: flex;
          align-items: center;
          width: 9.8rem;
          height: 3.6rem;
          gap: 1.2rem;
          padding: 0rem 0.4rem;
          border: none;
          background: transparent;
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;

          &:focus {
            border-radius: 0.8rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }

          &:hover {
            border-radius: 0.8rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
      >
        <Icon icon="basicProfile" size={2.4} />
        <Typography variant="body12Medium" color="gray700">
          {"홍길동"}
        </Typography>
      </button>

      {/* ---------- 구분선 ---------- */}
      <div
        css={css`
          width: 0.1rem;
          height: 1.8rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray200};
          margin: 0 0.8rem;
        `}
      />

      {/* ---------- 헬프 센터 버튼 ---------- */}
      <button
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          height: 3.6rem;
          gap: 0.6rem;
          padding: 0rem 1.6rem;
          border: none;
          background: transparent;
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;

          &:focus {
            border-radius: 0.8rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }

          &:hover {
            border-radius: 0.8rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
      >
        <Icon icon="ic_help" size={1.8} />
        <Typography variant="body12Medium" color="gray700">
          헬프 센터
        </Typography>
      </button>
    </footer>
  );
}
