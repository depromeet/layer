import { css } from "@emotion/react";

export const toastMap = {
  success: css`
    background-color: rgba(33, 37, 41, 0.8);
    color: #ffffff;
  `,
  error: css`
    background-color: rgba(225, 74, 74, 0.8);
    color: #ffffff;
  `,
};

export type ToastMessageType = keyof typeof toastMap;
