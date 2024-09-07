import { css } from "@emotion/react";

type QuestionListProps = {
  gap?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLUListElement>;

export function QuestionList({ gap = "1.1rem", children }: QuestionListProps) {
  return (
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        gap: ${gap};
      `}
    >
      {children}
    </ul>
  );
}
