import { css } from "@emotion/react";
import { forwardRef } from "react";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

type UserProfileDropdownProps = {
  isOpen: boolean;
  onAccountSettings: () => void;
  onFeedback: () => void;
  onHelp: () => void;
  onLogout: () => void;
};

export const UserProfileDropdown = forwardRef<HTMLDivElement, UserProfileDropdownProps>(
  ({ isOpen, onAccountSettings, onFeedback, onHelp, onLogout }, ref) => {
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        css={css`
          position: absolute;
          bottom: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
          border-radius: 0.8rem;
          box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1);
          margin-bottom: 0.8rem;
          z-index: 1000;
          overflow: hidden;
          animation: slideUp 0.2s ease-out;
          min-width: 16.5rem;

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      >
        <DropdownItem onClick={onAccountSettings}>계정 설정</DropdownItem>
        <DropdownItem onClick={onFeedback}>평가 및 피드백</DropdownItem>
        <DropdownItem onClick={onHelp}>도움말</DropdownItem>
        <DropdownItem onClick={onLogout}>로그아웃</DropdownItem>
      </div>
    );
  },
);

UserProfileDropdown.displayName = "UserProfileDropdown";

type DropdownItemProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const DropdownItem = ({ children, onClick }: DropdownItemProps) => {
  return (
    <button
      css={css`
        width: 100%;
        padding: 0.8rem 2rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        border: none;
        background: transparent;
        text-align: left;
        cursor: pointer;
        font-size: 1.4rem;
        color: ${DESIGN_TOKEN_COLOR.gray800};
        transition: background-color 0.2s ease;

        &:hover {
          background-color: ${DESIGN_TOKEN_COLOR.gray100};
        }
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
