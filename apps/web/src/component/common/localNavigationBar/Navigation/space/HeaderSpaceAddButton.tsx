import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { useNavigation } from "../../context/NavigationContext";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export default function HeaderSpaceAddButton() {
  const { isCollapsed } = useNavigation();

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        align-items: center;
        padding-bottom: 0.4rem;

        ${isCollapsed
          ? css`
              justify-content: center;
              padding-left: 0;
            `
          : css`
              justify-content: space-between;
              padding-left: 0.8rem;
            `}
      `}
    >
      <Typography
        variant="subtitle16SemiBold"
        color="gray900"
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
        내 스페이스
      </Typography>
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
        <Icon icon="ic_plus" size={1.6} />
      </div>
    </div>
  );
}
