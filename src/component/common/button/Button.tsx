import { css } from "@emotion/react";
import { PropsWithChildren } from "react";

export type ButtonProps = {
  colorSchema?: string;
  disabled?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export function Button({ children, colorSchema = "primary", disabled = false, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button
      css={css`
        border-radius: 0.6rem;
        color: white;
        background-color: #212529;
        width: 100%;
        height: 4.8rem;
        padding: 1.4rem 0;
        border: none;
        font-size: 1.6rem;
        cursor: pointer;

        // FIXME: 추후 디자인 토큰 나오면 세부 수정 진행 필요
        ${colorSchema === "sky" &&
        css`
          background-color: #608dff;
        `}
        ${colorSchema === "gray" &&
        css`
          background-color: #f1f3f5;
          color: #868e96;
        `}
        ${colorSchema === "white" &&
        css`
          background-color: #fff;
          color: #212529;
        `}
      
        ${disabled &&
        css`
          background-color: #c8cccf;
          color: rgba(33, 37, 41, 0.7);
          cursor: default;
        `}
      `}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
