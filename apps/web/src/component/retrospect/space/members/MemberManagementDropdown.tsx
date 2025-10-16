import React from "react";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

interface MemberManagementDropdownProps {
  children: React.ReactNode;
}

export function MemberManagementDropdown({ children }: MemberManagementDropdownProps) {
  return (
    <div
      css={css`
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 0.4rem;
        background-color: ${DESIGN_TOKEN_COLOR.white};
        border-radius: 1.2rem;
        box-shadow: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.1);
        z-index: 1000;
        min-width: 20rem;
        width: 28.8rem;
        max-height: 52rem;
        display: flex;
        flex-direction: column;
      `}
    >
      {children}
    </div>
  );
}
