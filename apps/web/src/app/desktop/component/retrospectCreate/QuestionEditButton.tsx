import { Icon } from "@/component/common/Icon";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

import { HTMLAttributes } from "react";
import QuestionEditSection from "./QuestionEditSection";

interface QuestionEditButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClose?: () => void;
}

function QuestionEditButton({ onClose, ...props }: QuestionEditButtonProps) {
  const { open, close } = useDesktopBasicModal();

  const handleClose = () => {
    close();
    onClose?.();
  };

  const handleEditButtonClick = () => {
    open({
      title: "질문 리스트",
      contents: <QuestionEditSection onClose={handleClose} />,
      options: {
        enableFooter: false,
        needsBackButton: true,
        backButtonCallback: handleClose,
      },
    });
  };

  return (
    <button
      type="button"
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 12rem;
        border: 1px solid #dfe3ea;
        border-radius: 3rem;
        padding: 1.2rem 1.6rem 1.2rem 1.2rem;
        font-size: 1.4rem;
        line-height: 140%;
        color: ${DESIGN_TOKEN_COLOR.gray700};
        font-weight: 600;
        cursor: pointer;
        z-index: 10;
        background-color: white;

        &:hover {
          background-color: #f5f5f5;
        }
      `}
      onClick={handleEditButtonClick}
      {...props}
    >
      <Icon
        icon="ic_write"
        size={2}
        css={css`
          margin-right: 0.8rem;
        `}
      />
      질문 수정
    </button>
  );
}

export default QuestionEditButton;
