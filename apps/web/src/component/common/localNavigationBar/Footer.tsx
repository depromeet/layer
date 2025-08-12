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
        display: flex;
        align-items: center;
        gap: 0.8rem;
        transition:
          padding 0.3s ease-in-out,
          gap 0.3s ease-in-out;

        ${isCollapsed
          ? css`
              padding: 0.4rem 2rem 1.2rem 2rem;
              flex-direction: column-reverse;
            `
          : css`
              padding: 0.6rem 2rem;
              flex-direction: row;
            `}
      `}
    >
      {/* ---------- 프로필 이미지/이름 ---------- */}
      <button
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.2rem;
          padding: 0rem 0.4rem;
          border: none;
          background: transparent;
          border-radius: 0.8rem;
          cursor: pointer;
          transition:
            background-color 0.2s ease-in-out,
            width 0.3s ease-in-out,
            height 0.3s ease-in-out;

          ${isCollapsed
            ? css`
                width: auto;
                height: 3.2rem;
              `
            : css`
                width: 100%;
                height: 3.6rem;
              `}

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
            overflow: hidden;
            white-space: nowrap;
            transition: opacity 0.3s ease-in-out;

            ${isCollapsed
              ? css`
                  display: none;
                  width: 0;
                  opacity: 0;
                  visibility: hidden;
                `
              : css`
                  display: block;
                  width: auto;
                  opacity: 1;
                  visibility: visible;
                `}
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
          gap: 0.6rem;
          padding: 0rem 0.4rem;
          border: none;
          background: transparent;
          border-radius: 0.8rem;
          cursor: pointer;
          transition:
            background-color 0.2s ease-in-out,
            width 0.3s ease-in-out,
            height 0.3s ease-in-out;

          ${isCollapsed
            ? css`
                width: 3.2rem;
                height: 3.2rem;
              `
            : css`
                width: 100%;
                height: 3.6rem;
              `}

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
            overflow: hidden;
            white-space: nowrap;
            transition: opacity 0.3s ease-in-out;

            ${isCollapsed
              ? css`
                  display: none;
                  width: 0;
                  opacity: 0;
                  visibility: hidden;
                `
              : css`
                  display: block;
                  width: auto;
                  opacity: 1;
                  visibility: visible;
                `}
          `}
        >
          헬프 센터
        </Typography>
      </button>
    </footer>
  );
}
