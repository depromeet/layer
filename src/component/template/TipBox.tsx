import { css } from "@emotion/react";

type TipBoxType = {
  title: string;
  content: string;
};
export function TipBox({ title, content }: TipBoxType) {
  return (
    <div
      id="tip"
      css={css`
        background: #f2f4f8;
        border-radius: 0.8rem;
        padding: 1.6rem 2rem;
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
      `}
    >
      <div>
        <span
          id="title"
          css={css`
            font-size: 1.8rem;
            font-weight: 600;
          `}
        >
          {title}
        </span>
      </div>
      <div>
        <span
          id="content"
          css={css`
            line-height: 1.5;
            color: #8b909c;
          `}
        >
          {content}
        </span>
      </div>
    </div>
  );
}
