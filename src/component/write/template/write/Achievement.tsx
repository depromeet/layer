import { css } from "@emotion/react";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

type ProgressBarProps = {
  answer: number;
  onClick: (index: number) => void;
};

export function WAchievementTemplate({ answer: AchivementIdx = -1, onClick }: ProgressBarProps) {
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
    <div
      css={css`
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0 2rem;
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
            cursor: pointer;
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
          onClick={() => onClick(index)}
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
                background-color: ${isActive ? DESIGN_TOKEN_COLOR.blue600 : "transparent"};
                border-radius: inherit;
                height: inherit;
                transition: 0.4s all;
              `}
            />
          </div>
          <span
            id="percent"
            css={css`
              color: ${index === AchivementIdx && "#6C9CFA"};
              font-weight: ${index === AchivementIdx && 500};
              transition: 0.4s all;
            `}
          >
            {(index + 1) * 20}
          </span>
        </div>
      ))}
    </div>
  );
}
