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
        border-radius: 1.2rem;
        color: white;
        background-color: #212529;
        width: 100%;
        height: 4.8rem;
        padding: 1.4rem 0;
        border: none;
        font-size: 1.6rem;
        font-weight: 500;
        cursor: pointer;
        transition: 0.4s all;

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
        `}
        ${colorSchema === "outline" &&
        css`
          border: 1px solid #dfe3ea;
          background-color: white;
          color: #454952;
        `}
        ${disabled &&
        css`
          background-color: #edf0f4;
          color: #a9afbb;
          cursor: not-allowed;
        `}
      `}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
