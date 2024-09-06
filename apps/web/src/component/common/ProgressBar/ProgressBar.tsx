import { css } from "@emotion/react";
import { Fragment } from "react";

type ProgressBarProps = {
  curPage: number;
  lastPage: number;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "type">;

export function ProgressBar({ curPage, lastPage, ...props }: ProgressBarProps) {
  if (curPage > lastPage) curPage = lastPage;

  const segments = Array.from({ length: lastPage }, (_, i) => i < curPage);

  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 0.5rem;
      `}
      {...props}
    >
      {segments.map((isActive, index) => (
        <Fragment key={index}>
          <div
            css={css`
              position: relative;
              width: 100%;
              background-color: #f1f3f5;
              border-radius: 5rem;
              height: 0.4rem;
            `}
          >
            <div
              css={css`
                position: absolute;
                width: ${isActive ? 100 : 0}%;
                background-color: #608dff;
                border-radius: 5rem;
                height: inherit;
                transition: 0.4s all;
              `}
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
}
