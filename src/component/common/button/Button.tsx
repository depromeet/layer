import { css } from "@emotion/react";
import Lottie from "lottie-react";
import { PropsWithChildren } from "react";

import Loading from "@/assets/lottie/button/loading/loading.json";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

export type ButtonProps = {
  colorSchema?: string;
  disabled?: boolean;
  isProgress?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export function Button({ children, isProgress = false, colorSchema = "primary", disabled = false, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button
      css={css`
        border-radius: 1.2rem;
        color: white;
        background-color: #212529;
        width: 100%;
        height: 4.8rem;
        padding: 1.4rem 0;
        border: none;
        font-size: 1.6rem;
        font-weight: 500;
        cursor: ${isProgress ? "not-allowed" : "pointer"};
        transition: 0.4s all;

        display: flex;
        align-items: center;
        justify-content: center;

        path {
          fill: ${isProgress && "white"};
        }

        // FIXME: 추후 디자인 토큰 나오면 세부 수정 진행 필요
        ${colorSchema === "sky" &&
        css`
          background-color: #608dff;
        `}
        ${colorSchema === "gray" &&
        css`
          background-color: #dfe3ea;
          color: #454952;
        `}
        ${colorSchema === "white" &&
        css`
          color: #212529;
          background-color: white;
          path {
            fill: ${DESIGN_TOKEN_COLOR.gray700};
          }
        `}
        ${colorSchema === "outline" &&
        css`
          border: 1px solid #dfe3ea;
          background-color: white;
          color: #454952;
          path {
            fill: ${DESIGN_TOKEN_COLOR.gray700};
          }
        `}
        ${disabled &&
        css`
          background-color: #edf0f4;
          color: #a9afbb;
          cursor: not-allowed;
        `}
      `}
      {...props}
      disabled={disabled || isProgress}
    >
      {isProgress ? (
        <Lottie
          animationData={Loading}
          loop={true}
          css={css`
            width: auto;
            height: 13rem;
          `}
        />
      ) : (
        children
      )}
    </button>
  );
}
