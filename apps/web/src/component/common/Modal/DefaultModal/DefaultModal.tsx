import { css } from "@emotion/react";

import { Portal } from "@/component/common/Portal";

import { useNavigate } from "react-router-dom";

import DefaultModalFooter from "./DefaultModalFooter";
import DefaultModalHeader from "./DefaultModalHeader";

import { ANIMATION } from "@/style/common/animation";

type DefaultModalProps = {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
};

export default function DefaultModal({ title, onClose, onConfirm, children }: DefaultModalProps) {
  const navigate = useNavigate();

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
            padding: 2rem;
            animation: ${ANIMATION.FADE_IN} 0.4s ease-in-out;
            transition: 0.4s all;
          `}
        >
          <DefaultModalHeader title={title} onBack={() => navigate(-1)} onClose={onClose} />
          <div
            css={css`
              flex: 1;
              overflow-y: auto;
              padding: 2rem 0;
            `}
          >
            {children}
          </div>
          <DefaultModalFooter rightFunction={onConfirm} />
        </div>
      </div>
    </Portal>
  );
}
