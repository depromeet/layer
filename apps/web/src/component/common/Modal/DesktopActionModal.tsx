import { css } from "@emotion/react";
import { Portal } from "@/component/common/Portal";
import { ANIMATION } from "@/style/common/animation";
import DesktopModalHeader from "./DesktopModalHeader";
import { useActionModal } from "@/hooks/useActionModal";

export default function DesktopActionModal() {
  const { actionModalState, closeActionModal } = useActionModal();

  if (!actionModalState.isOpen) return null;

  const handleClose = () => {
    closeActionModal();
  };

  return (
    <Portal id="modal-root">
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          background-color: rgba(0, 0, 0, 0.5);
        `}
      >
        <div
          css={css`
            width: 37.5rem;
            min-height: 28rem;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            padding: 2.4rem 2.4rem 0;
            animation: ${ANIMATION.FADE_IN} 0.4s ease-in-out;
            transition: 0.4s all;
          `}
        >
          <DesktopModalHeader title={actionModalState.title} onClose={handleClose} />
          {actionModalState.contents}
        </div>
      </div>
    </Portal>
  );
}
