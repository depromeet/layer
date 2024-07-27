import { css } from "@emotion/react";

import { ResultContainer } from "@/component/write/template/complete/ResultContainer.tsx";

type ProgressBarProps = {
  question: string;
  index: number;
};

export function CAchievementTemplate({ question, index: AchivementIdx = 0 }: ProgressBarProps) {
  const segments = Array.from({ length: 5 }, (_, i) => i < AchivementIdx + 1);
  const defaultBorderStyle = css`
    border-radius: 0;
  `;
  const firstBorderStyle = css`
    border-radius: 5rem 0 0 5rem;
  `;
  const finalBorderStyle = css`
    border-radius: 0 5rem 5rem 0;
  `;

  return (
    <ResultContainer
      question={question}
      css={css`
        #line {
          margin-bottom: 3.5rem;
        }
      `}
    >
      {segments.map((isActive, index) => (
        <div
          key={index}
          css={css`
            width: 100%;
            display: flex;
            align-items: center;
            position: relative;
            color: #b3b3b3;

            #percent {
              position: absolute;
              bottom: 2.5rem;
              font-size: 1.2rem;
            }

            #percent:nth-of-type(1) {
              right: -1rem;
            }

            ${index === 0 &&
            css`
              #percent:nth-of-type(1) {
                left: 0;
              }

              #percent:nth-of-type(2) {
                right: -1rem;
              }
            `}

            ${index === 4 &&
            css`
              #percent:nth-of-type(1) {
                right: 0;
              }
            `}
          `}
        >
          {index === 0 && <span id="percent">0</span>}
          <div
            css={css`
              position: relative;
              width: 100%;
              background-color: #f1f3f5;
              border-radius: ${defaultBorderStyle};
              ${index === 0 && firstBorderStyle}
              ${index === 4 && finalBorderStyle}
              height: 1.9rem;
            `}
          >
            <div
              css={css`
                position: absolute;
                width: 100%;
                background-color: ${isActive ? `rgba(108, 156, 250, 0.${5 + index})` : "transparent"};
                border-radius: inherit;
                height: inherit;
                transition: 0.4s all;
              `}
            />
          </div>
          <span
            id="percent"
            css={css`
              color: ${index === AchivementIdx && "#212529"};
              transition: 0.4s all;
            `}
          >
            {(index + 1) * 20}
          </span>
        </div>
      ))}
    </ResultContainer>
  );
}
