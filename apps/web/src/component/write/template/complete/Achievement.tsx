import { css } from "@emotion/react";

import { ResultContainer } from "@/component/write/template/complete/ResultContainer.tsx";
import { ACHIEVEMENT_COLOR_DEFAULT_COLOR } from "@/component/write/template/template.const.ts";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens.ts";
import { getDeviceType } from "@/utils/deviceUtils";

type ProgressBarProps =
  | { name: string; question?: never; index: number }
  | { question: string; name?: never; index: number }
  | { question?: never; name?: never; index: number };

export function CAchievementTemplate({ name, question, index: AchivementIdx = -1 }: ProgressBarProps) {
  const { isDesktop } = getDeviceType();

  const noNameAndQuestion = !name && !question;

  // * 0퍼센트 텍스트 스타일 함수
  const getPercentTextStyle = (currentIndex: number) => {
    if (!isDesktop) return css``;

    return css`
      ${currentIndex === AchivementIdx ? DESIGN_TOKEN_TEXT.caption10Bold : DESIGN_TOKEN_TEXT.caption10Medium}
      color: ${currentIndex === AchivementIdx ? DESIGN_TOKEN_COLOR.blue600 : "inherit"};
      transition: 0.4s all;
    `;
  };

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
      name={name}
      customCss={css`
        #line,
        #space {
          margin-bottom: ${isDesktop ? "3rem" : "3.5rem"};
        }
      `}
    >
      {segments.map((isActive, index) => (
        <div
          key={index}
          css={css`
            width: 100%;
            display: flex;
            margin-top: ${noNameAndQuestion ? "1rem" : "0rem"};
            align-items: center;
            position: relative;
            color: #b3b3b3;

            #percent {
              position: absolute;
              bottom: ${isDesktop ? "1.8rem" : "2.5rem"};
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
          {index === 0 && (
            <span id="percent" css={getPercentTextStyle(index)}>
              0
            </span>
          )}
          <div
            css={css`
              position: relative;
              width: 100%;
              background-color: #f1f3f5;
              border-radius: ${defaultBorderStyle};
              ${index === 0 && firstBorderStyle}
              ${index === 4 && finalBorderStyle}
              height: ${isDesktop ? "1.5rem" : "1.9rem"};
            `}
          >
            <div
              css={css`
                position: absolute;
                width: 100%;
                background-color: ${isActive ? ACHIEVEMENT_COLOR_DEFAULT_COLOR : "transparent"};
                border-radius: inherit;
                height: inherit;
                transition: 0.4s all;
              `}
            />
          </div>
          <span id="percent" css={getPercentTextStyle(index)}>
            {(index + 1) * 20}
          </span>
        </div>
      ))}
    </ResultContainer>
  );
}
