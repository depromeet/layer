import { css } from "@emotion/react";

import { Icon } from "../../Icon";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

const HEADER_CONSTANTS = {
  LOGO_SIZE: 6.36,
  TOGGLE_BUTTON_SIZE: 3.2,
  ICON_SIZE_EXPANDED: 1.6,
  ANIMATION_DURATION: "0.3s",
} as const;

interface HeaderProps {
  handleToggleCollapse: () => void;
}

export default function Header({ handleToggleCollapse }: HeaderProps) {
  return (
    <header
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2.2rem 1.2rem 1.8rem 2rem;
        border-bottom: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
        transition: padding ${HEADER_CONSTANTS.ANIMATION_DURATION} ease-in-out;
      `}
    >
      {/* ---------- 로고 ---------- */}
      <Icon icon="ic_logo" size={HEADER_CONSTANTS.LOGO_SIZE} />

      {/* ---------- 토글 버튼 ---------- */}
      <button
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: ${HEADER_CONSTANTS.TOGGLE_BUTTON_SIZE}rem;
          height: ${HEADER_CONSTANTS.TOGGLE_BUTTON_SIZE}rem;
          padding: 0.7rem;
          transition:
            background-color 0.2s ease-in-out,
            padding ${HEADER_CONSTANTS.ANIMATION_DURATION} ease-in-out;
          border-radius: 0.8rem;
          cursor: pointer;

          &:hover {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
        onClick={handleToggleCollapse}
      >
        <Icon icon="ic_arrow_back" size={HEADER_CONSTANTS.ICON_SIZE_EXPANDED} />
      </button>
    </header>
  );
}
