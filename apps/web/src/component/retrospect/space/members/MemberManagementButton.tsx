import React from "react";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

interface MemberManagementButtonProps {
  onClick: (e: React.MouseEvent) => void;
  memberCount?: number;
  isOpen?: boolean;
}

export function MemberManagementButton({ onClick, memberCount, isOpen = false }: MemberManagementButtonProps) {
  return (
    <div
      onClick={onClick}
      css={css`
        display: flex;
        padding: 0.8rem 1.2rem;
        border-radius: 0.8rem;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        cursor: pointer;
        background-color: ${DESIGN_TOKEN_COLOR.white};
        color: ${DESIGN_TOKEN_COLOR.gray600};
      `}
    >
      <Icon icon={"ic_team"} size={2.0} color={DESIGN_TOKEN_COLOR.gray00} />
      <Typography variant="body14SemiBold" color="gray600">
        {memberCount}
      </Typography>
      <Icon
        icon={"ic_chevron_down"}
        size={1.6}
        color={DESIGN_TOKEN_COLOR.gray600}
        css={css`
          transform: rotate(${isOpen ? "180deg" : "0deg"});
          transition: transform 0.2s ease;
        `}
      />
    </div>
  );
}
