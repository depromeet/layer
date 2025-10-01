import { css } from "@emotion/react";

import { ResultContainer } from "@/component/write/template/complete/ResultContainer.tsx";
import { getDeviceType } from "@/utils/deviceUtils";

type DescriptiveTemplateProps = { name: string; question?: never; answer: string } | { question: string; name?: never; answer: string };

export function CDescriptiveTemplate({ name, question, answer }: DescriptiveTemplateProps) {
  const { isDesktop } = getDeviceType();

  return (
    <ResultContainer question={question} name={name}>
      {/*  FIXME: SPACE 컴포넌트 넣기 */}
      <div
        css={css`
          line-height: 2;
          font-size: 1.5rem;
          font-weight: 300;
          overflow-y: auto;
          width: 100%;
          max-height: 25rem;

          ${isDesktop
            ? css`
                white-space: pre-wrap;
                word-wrap: break-word;
                word-break: break-word;
                hyphens: auto;
              `
            : css`
                white-space: pre-wrap;
              `}
        `}
      >
        {answer}
      </div>
    </ResultContainer>
  );
}
