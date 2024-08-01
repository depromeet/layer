import { css } from "@emotion/react";
import React, { PropsWithChildren } from "react";

type ResultContainerProps = {
  question: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "type">;

export function ResultContainer({ question, children, ...props }: PropsWithChildren<ResultContainerProps>) {
  return (
    <div
      css={css`
        width: 100%;
        margin-top: 2.4rem;
        border-radius: 0.78rem;
        padding: 1.9rem 2rem 1.7rem 2rem;
        height: 100%;
        min-height: fit-content;
        box-shadow: 0 3.886px 11.657px 0 rgba(33, 37, 41, 0.04);
        font-size: 1.6rem;
        color: #212529;
      `}
      {...props}
    >
      <span
        id="question"
        css={css`
          font-weight: 500;
        `}
      >
        {question}
      </span>
      <div
        id="line"
        css={css`
          width: 100%;
          border: solid 0.01rem #eee;
          background: transparent;
          border-radius: 5rem;
          margin: 2rem 0 1.3rem 0;
        `}
      />
      <div
        id="children"
        css={css`
          display: flex;
          justify-content: center;
          column-gap: 0.8rem;
        `}
      >
        {children}
      </div>
    </div>
  );
}
