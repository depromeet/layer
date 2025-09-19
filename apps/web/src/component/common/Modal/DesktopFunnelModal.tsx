import { css } from "@emotion/react";

import { Portal } from "@/component/common/Portal";
import { useModal } from "@/hooks/useModal";
import { ANIMATION } from "@/style/common/animation";
import DesktopFunnelModalHeader from "./DesktopFunnelModalHeader";

export default function DesktopFunnelModal() {
  const { modalDataState, close } = useModal();

  const { title } = modalDataState;

  const renderContent = () => {
    return modalDataState.contents;
  };

  if (!modalDataState.isOpen) return null;

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
            width: 52rem;
            height: 65.2rem;
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
          <DesktopFunnelModalHeader title={title} onClose={close} />
          {renderContent()}
        </div>
      </div>
    </Portal>
  );
}
