import { css } from "@emotion/react";
import { useRegisterSW } from "virtual:pwa-register/react";

export function PWAUpdatePrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div
      css={css`
        position: fixed;
        bottom: 2.4rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 1.2rem;
        padding: 1.4rem 2rem;
        background: #212329;
        border-radius: 1.2rem;
        box-shadow:
          0 4px 16px rgba(0, 0, 0, 0.2),
          0 1px 4px rgba(0, 0, 0, 0.1);
        white-space: nowrap;
      `}
    >
      <span
        css={css`
          font-size: 1.4rem;
          color: #ffffff;
          font-weight: 500;
          line-height: 1.5;
        `}
      >
        변경된 사항이 존재해요
      </span>
      <button
        onClick={() => updateServiceWorker(true)}
        css={css`
          padding: 0.6rem 1.4rem;
          background: #009bff;
          color: #ffffff;
          font-size: 1.3rem;
          font-weight: 600;
          border: none;
          border-radius: 0.8rem;
          cursor: pointer;
          line-height: 1.5;

          &:active {
            opacity: 0.85;
          }
        `}
      >
        업데이트
      </button>
    </div>
  );
}
