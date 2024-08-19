import { css } from "@emotion/react";

export const toastMap = {
  success: css`
    background-color: rgba(6, 8, 12, 0.8);
    color: #ffffff;
  `,
  error: css`
    background-color: rgba(6, 8, 12, 0.8);
    color: #ffffff;
  `,
};

export type ToastMessageType = keyof typeof toastMap;
