import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens";

type GoalCompletionRateChartProps = {
  teamName: string;
  goalCompletionRate: number;
};

export function GoalCompletionRateChart({ teamName, goalCompletionRate }: GoalCompletionRateChartProps) {
  const numberOfSegments = 5;
  const segmentWidth = 100 / numberOfSegments;
  const filledSegments = Math.floor(goalCompletionRate / segmentWidth);
  const remainderPercentage = (goalCompletionRate % segmentWidth) * (100 / segmentWidth);

  return (
    <div
      css={css`
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        padding: 2.8rem 2.6rem;
        border-radius: 0.8rem;
        display: flex;
        flex-direction: column;
      `}
    >
      <Typography
        css={css`
          ${DESIGN_TOKEN_TEXT.subtitle18SemiBold};
          color: ${DESIGN_TOKEN_COLOR.gray900};
          margin-bottom: 6.5rem;
        `}
      >
        {teamName} 팀이 생각하는
        <br />
        목표달성률은{" "}
        <span
          css={css`
            color: ${DESIGN_TOKEN_COLOR.blue600};
          `}
        >
          평균 {goalCompletionRate}%
        </span>
        에요
      </Typography>

      <div
        css={css`
          position: relative;
          width: 100%;
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            display: flex;
            width: 100%;
            height: 2.9rem;
            border-radius: 1rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray00};
            overflow: hidden;
          `}
        >
          {[...Array<number>(numberOfSegments)].map((_, index) => (
            <div
              key={index}
              css={css`
                flex: 1;
                background-color: ${index < filledSegments ? DESIGN_TOKEN_COLOR.blue600 : DESIGN_TOKEN_COLOR.gray300};
                margin-right: 0.2rem;
                position: relative;
                border-radius: ${index === 0 ? "1rem 0 0 1rem" : index === numberOfSegments - 1 ? "0 1rem 1rem 0" : "0"};
              `}
            >
              {index === filledSegments && remainderPercentage > 0 && (
                <div
                  css={css`
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: ${remainderPercentage}%;
                    background-color: ${DESIGN_TOKEN_COLOR.blue600};
                  `}
                />
              )}
            </div>
          ))}
        </div>

        <div
          css={css`
            position: absolute;
            top: -4.5rem;
            left: ${goalCompletionRate}%;
            transform: translateX(-50%);
            background-color: ${DESIGN_TOKEN_COLOR.gray00};
            padding: 0.4rem 0.6rem;
            border-radius: 1rem;
            box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow200};
            display: flex;
            align-items: center;
            &::after {
              content: "";
              position: absolute;
              bottom: -0.5rem;
              left: 50%;
              transform: translateX(-50%);
              width: 1.2rem;
              height: 1.2rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray00};
              border-radius: 50% / 100%;
            }
          `}
        >
          <Typography
            css={css`
              ${DESIGN_TOKEN_TEXT.body14Medium};
              margin-left: 0.3rem;
              color: ${DESIGN_TOKEN_COLOR.blue600};
            `}
          >
            👥 {goalCompletionRate}%
          </Typography>
        </div>
      </div>

      <div
        css={css`
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 0.5rem;
        `}
      >
        <Typography
          css={css`
            ${DESIGN_TOKEN_TEXT.body14Medium};
            color: ${DESIGN_TOKEN_COLOR.gray500};
          `}
        >
          0
        </Typography>
        <Typography
          css={css`
            ${DESIGN_TOKEN_TEXT.body14Medium};
            color: ${DESIGN_TOKEN_COLOR.gray500};
          `}
        >
          100
        </Typography>
      </div>
    </div>
  );
}
