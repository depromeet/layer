import { css } from "@emotion/react";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

interface HeaderSpaceAddButtonProps {
  isCollapsed: boolean;
}

export default function HeaderSpaceAddButton({ isCollapsed }: HeaderSpaceAddButtonProps) {
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        justify-content: ${isCollapsed ? "center" : "space-between"};
        align-items: center;
        padding-left: ${isCollapsed ? "0" : "0.8rem"};
        padding-bottom: 0.4rem;
      `}
    >
      <Typography
        variant="subtitle16SemiBold"
        color="gray900"
        css={css`
          width: ${isCollapsed ? "0" : "auto"};
          opacity: ${isCollapsed ? 0 : 1};
          visibility: ${isCollapsed ? "hidden" : "visible"};
          transition: opacity 0.3s ease-in-out;
          overflow: hidden;
          white-space: nowrap;
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
