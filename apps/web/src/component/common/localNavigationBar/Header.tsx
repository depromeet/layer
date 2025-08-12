import { css } from "@emotion/react";

import { Icon } from "../Icon";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

const HEADER_CONSTANTS = {
  LOGO_SIZE: 6.36,
  TOGGLE_BUTTON_SIZE: 3.2,
  ICON_SIZE_EXPANDED: 1.6,
  ICON_SIZE_COLLAPSED: 2,
  ANIMATION_DURATION: "0.3s",
} as const;

interface HeaderProps {
  isCollapsed: boolean;
  handleToggleCollapse: () => void;
}

export default function Header({ isCollapsed, handleToggleCollapse }: HeaderProps) {
  return (
    <header
      css={css`
        display: flex;
        align-items: center;
        border-bottom: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
        transition: padding ${HEADER_CONSTANTS.ANIMATION_DURATION} ease-in-out;

        ${isCollapsed
          ? css`
              justify-content: center;
              padding: 2.2rem 1.2rem 1.8rem 1.2rem;
            `
          : css`
              justify-content: space-between;
              padding: 2.2rem 1.2rem 1.8rem 2rem;
            `}
      `}
    >
      {/* ---------- 로고 ---------- */}
      <div
        css={css`
          overflow: hidden;
          transition: opacity 0.3s ease-in-out;

          ${isCollapsed
            ? css`
                opacity: 0;
                visibility: hidden;
                width: 0;
              `
            : css`
                opacity: 1;
                visibility: visible;
                width: auto;
              `}
        `}
      >
        <Icon icon="ic_logo" size={HEADER_CONSTANTS.LOGO_SIZE} />
      </div>

      {/* ---------- 토글 버튼 ---------- */}
      <button
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: ${HEADER_CONSTANTS.TOGGLE_BUTTON_SIZE}rem;
          height: ${HEADER_CONSTANTS.TOGGLE_BUTTON_SIZE}rem;
          border-radius: 0.8rem;
          cursor: pointer;
          transition:
            background-color 0.2s ease-in-out,
            padding ${HEADER_CONSTANTS.ANIMATION_DURATION} ease-in-out;

          ${isCollapsed
            ? css`
                padding: 0.2rem;
              `
            : css`
                padding: 0.7rem;
              `}

          &:hover {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
        onClick={handleToggleCollapse}
      >
        <Icon
          icon={isCollapsed ? "ic_unfold_right" : "ic_arrow_back"}
          size={isCollapsed ? HEADER_CONSTANTS.ICON_SIZE_COLLAPSED : HEADER_CONSTANTS.ICON_SIZE_EXPANDED}
        />
      </button>
    </header>
  );
}
