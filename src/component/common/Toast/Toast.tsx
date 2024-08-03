import { css } from "@emotion/react";

import { Portal } from "@/component/common/Portal";
import { ToastItem } from "@/component/common/Toast";
import { useToast } from "@/hooks/useToast";

export function Toast() {
  const { toastDataState } = useToast();

  return (
    <Portal id="toast-root">
      <div
        css={css`
          position: fixed;
          display: flex;
          flex-direction: column-reverse;
          row-gap: 0.5rem;
          top: 10px;
          left: 50%;
          transform: translate(-50%, 0);
          z-index: 10001;
        `}
      >
        {toastDataState.map((toast) => (
          <ToastItem key={toast.id} {...toast} />
        ))}
      </div>
    </Portal>
  );
}
