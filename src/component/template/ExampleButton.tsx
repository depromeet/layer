import { css } from "@emotion/react";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { Icon } from "@/component/common/Icon";

export function ExampleButton({ children = "회고 예시 보기" }: PropsWithChildren<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">>) {
  return (
    <button
      css={css`
        color: #6c9cfa;
        background: #e9f0ff;
        padding: 2rem;
        border-radius: 1.2rem;
        font-size: 1.6rem;

        display: flex;
        align-items: center;

        div:nth-of-type(1) {
          font-weight: 500;
        }
      `}
    >
      <div>{children}</div>
      <Icon
        icon={"ic_back"}
        css={css`
          transform: rotate(180deg);
          color: #6c9cfa;
          margin-left: auto;
        `}
        size={1.7}
      />
    </button>
  );
}
