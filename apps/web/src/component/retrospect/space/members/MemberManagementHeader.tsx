import React from "react";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

interface MemberManagementHeaderProps {
  isEditOpen: boolean;
  onEditClick: (e: React.MouseEvent) => void;
  editDropdownRef: React.RefObject<HTMLDivElement>;
  onEditAction: (action: string) => void;
}

export function MemberManagementHeader({ isEditOpen, onEditClick, editDropdownRef, onEditAction }: MemberManagementHeaderProps) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.6rem;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 0.4rem;
        `}
      >
        <Typography variant="title16Bold" color="gray900">
          팀원관리
        </Typography>
        <Typography variant="title16Bold" color="gray600">
          4
        </Typography>
      </div>
      <div
        css={css`
          position: relative;
        `}
      >
        <div
          onClick={onEditClick}
          css={css`
            display: flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.4rem 0.8rem;
            border-radius: 0.6rem;
            cursor: pointer;
            transition: background-color 0.2s ease;

            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.gray100};
            }
          `}
        >
          <Typography variant="body14Medium" color="gray600">
            편집
          </Typography>
        </div>

        {isEditOpen && <EditDropdown ref={editDropdownRef} onEditAction={onEditAction} />}
      </div>
    </div>
  );
}

interface EditDropdownProps {
  onEditAction: (action: string) => void;
}

const EditDropdown = React.forwardRef<HTMLDivElement, EditDropdownProps>(({ onEditAction }, ref) => {
  const editOptions = [
    { label: "대표자 변경", action: "대표자 변경" },
    { label: "팀원 삭제", action: "팀원 삭제", isDestructive: true },
  ];

  return (
    <div
      ref={ref}
      css={css`
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 0.4rem;
        background-color: ${DESIGN_TOKEN_COLOR.white};
        border-radius: 0.8rem;
        box-shadow: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.1);
        z-index: 1001;
        min-width: 12rem;
        border: 1px solid ${DESIGN_TOKEN_COLOR.gray200};
      `}
    >
      {editOptions.map((option, index) => (
        <div
          key={index}
          onClick={() => onEditAction(option.action)}
          css={css`
            margin: 0.5rem 0;
            padding: 0.8rem 2rem;
            cursor: pointer;
            transition: background-color 0.2s ease;

            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.gray100};
            }
          `}
        >
          <Typography variant="subtitle14SemiBold" color={option.isDestructive ? "red500" : "gray800"}>
            {option.label}
          </Typography>
        </div>
      ))}
    </div>
  );
});
