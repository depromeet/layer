import { css } from "@emotion/react";

import { ResultContainer } from "@/component/write/template/complete/ResultContainer.tsx";

type DescriptiveTemplateProps = {
  question: string;
  answer: string;
};
export function CDescriptiveTemplate({ question, answer }: DescriptiveTemplateProps) {
  return (
    <ResultContainer question={question}>
      {/*  FIXME: SPACE 컴포넌트 넣기 */}
      <div
        css={css`
          line-height: 2;
          font-size: 1.5rem;
          font-weight: 300;
          overflow-y: auto;
          white-space: pre-line;
          width: 100%;
          max-height: 25rem;
        `}
      >
        {answer}
      </div>
    </ResultContainer>
  );
}
