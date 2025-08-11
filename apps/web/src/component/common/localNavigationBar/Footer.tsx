import { css } from "@emotion/react";

import { Icon } from "../Icon";
import { Typography } from "../typography";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

interface FooterProps {
  isCollapsed: boolean;
}

export default function Footer({ isCollapsed }: FooterProps) {
  return (
    <footer
      css={css`
        border-top: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
        padding: ${isCollapsed ? "0.4rem 2rem 1.2rem 2rem" : "0.6rem 2rem"};
        display: flex;
        flex-direction: ${isCollapsed ? "column-reverse" : "row"};
        align-items: center;
        gap: 0.8rem;
      `}
    >
      {/* ---------- 프로필 이미지/이름 ---------- */}
      <button
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: ${isCollapsed ? "auto" : "100%"};
          height: ${isCollapsed ? "3.2rem" : "3.6rem"};
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

        <Typography
          variant="body12Medium"
          color="gray700"
          css={css`
            display: ${isCollapsed ? "none" : "block"};
            width: ${isCollapsed ? "0" : "auto"};
            opacity: ${isCollapsed ? 0 : 1};
            visibility: ${isCollapsed ? "hidden" : "visible"};
            transition: opacity 0.3s ease-in-out;
            overflow: hidden;
            white-space: nowrap;
          `}
        >
          {"홍길동"}
        </Typography>
      </button>

      {/* ---------- 구분선 ---------- */}
      {!isCollapsed && (
        <div
          css={css`
            width: 0.1rem;
            height: 1.8rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray200};
            margin: 0 0.8rem;
          `}
        />
      )}

      {/* ---------- 헬프 센터 버튼 ---------- */}
      <button
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: ${isCollapsed ? "3.2rem" : "100%"};
          height: ${isCollapsed ? "3.2rem" : "3.6rem"};
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

        <Typography
          variant="body12Medium"
          color="gray700"
          css={css`
            display: ${isCollapsed ? "none" : "block"};
            width: ${isCollapsed ? "0" : "auto"};
            opacity: ${isCollapsed ? 0 : 1};
            visibility: ${isCollapsed ? "hidden" : "visible"};
            transition: opacity 0.3s ease-in-out;
            overflow: hidden;
            white-space: nowrap;
          `}
        >
          헬프 센터
        </Typography>
      </button>
    </footer>
  );
}
