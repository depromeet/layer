import { css } from "@emotion/react";

import { Icon } from "../../../Icon";
import { Typography } from "../../../typography";
import { useNavigation } from "../../context/NavigationContext";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export default function SpaceAddButton() {
  const { isCollapsed } = useNavigation();

  return (
    <button
      css={css`
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1.6rem;
        margin-top: 0.4rem;
        padding: 0.5rem 1rem;
        border-radius: 0.8rem;
        cursor: pointer;
        overflow: hidden;
        transition:
          background-color 0.2s ease-in-out,
          opacity 0.3s ease-in-out,
          height 0.3s ease-in-out,
          transform 0.3s ease-in-out;

        ${isCollapsed
          ? css`
              opacity: 0;
              visibility: hidden;
              height: 0;
              transform: scaleY(0);
            `
          : css`
              opacity: 1;
              visibility: visible;
              height: auto;
              transform: scaleY(1);
            `}

        &:hover {
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
        }
      `}
    >
      <div
        css={css`
          width: 2.4rem;
          height: 2.4rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
          padding: 0.5rem;
          border-radius: 0.8rem;
        `}
      >
        <Icon icon="ic_plus" size={1.4} color={DESIGN_TOKEN_COLOR.gray600} />
      </div>
      <Typography
        variant="body14Medium"
        color="gray600"
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
        스페이스 추가
      </Typography>
    </button>
  );
}
