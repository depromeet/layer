import { css } from "@emotion/react";

import { Icon } from "../../Icon";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

const COLLAPSED_HEADER_CONSTANTS = {
  TOGGLE_BUTTON_SIZE: 3.2,
  ICON_SIZE: 2,
  ANIMATION_DURATION: "0.3s",
} as const;

interface CollapsedHeaderProps {
  handleToggleCollapse: () => void;
}

export default function CollapsedHeader({ handleToggleCollapse }: CollapsedHeaderProps) {
  return (
    <header
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2.2rem 1.2rem 1.8rem 1.2rem;
        border-bottom: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
        transition: padding ${COLLAPSED_HEADER_CONSTANTS.ANIMATION_DURATION} ease-in-out;
      `}
    >
      {/* ---------- 토글 버튼 ---------- */}
      <button
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: ${COLLAPSED_HEADER_CONSTANTS.TOGGLE_BUTTON_SIZE}rem;
          height: ${COLLAPSED_HEADER_CONSTANTS.TOGGLE_BUTTON_SIZE}rem;
          padding: 0.2rem;
          transition:
            background-color 0.2s ease-in-out,
            padding ${COLLAPSED_HEADER_CONSTANTS.ANIMATION_DURATION} ease-in-out;
          border-radius: 0.8rem;
          cursor: pointer;

          &:hover {
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
          }
        `}
        onClick={handleToggleCollapse}
      >
        <Icon icon="ic_unfold_right" size={COLLAPSED_HEADER_CONSTANTS.ICON_SIZE} />
      </button>
    </header>
  );
}
