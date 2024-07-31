import { css } from "@emotion/react";

import { Portal } from "@/component/common/Portal";

type FullModalProps = {
  children: React.ReactNode;
};

export function FullModal({ children }: FullModalProps) {
  return (
    <Portal id="modal-root">
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
        `}
      >
        <div
          css={css`
            height: 100dvh;
            width: 48rem;
            background-color: #ffffff;
            overflow-y: auto;
          `}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}
