import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Point } from "@/types/analysis";
import { getAnalysisConfig } from "@/utils/analysis/getAnalysisConfig";
import { css } from "@emotion/react";
import { PATHS } from "@layer/shared";
import { useNavigate } from "react-router-dom";

type AnalyticsSummaryBoxProps = {
  type: "good" | "bad" | "improvement";
  analysis: Point;
};

export default function AnalyticsSummaryBox({ type, analysis }: AnalyticsSummaryBoxProps) {
  const navigate = useNavigate();
  const { spaceName, retrospectTitle, spaceId, retrospectId } = analysis;

  const config = getAnalysisConfig(type);

  const handleAnalysisClick = () => {
    navigate(PATHS.retrospectAnalysis(String(spaceId), retrospectId, retrospectTitle));
  };

  return (
    <section
      css={css`
        display: flex;
        align-items: center;
        gap: 1.2rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray100};
        padding: 1.6rem;
        border-radius: 1.2rem;
      `}
    >
      <Icon icon={config.icon} color={DESIGN_TOKEN_COLOR.gray800} size={1.6} />
      <section
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          min-width: 0;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            flex: 1;
            min-width: 0;
          `}
        >
          <Typography variant="subtitle14SemiBold" color="gray800">
            {config.title}
          </Typography>
          <Typography
            variant="body12SemiBold"
            color="gray600"
            css={css`
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}
          >
            {retrospectTitle} | {spaceName}
          </Typography>
        </div>

        {/* TODO: Space 분석으로 이동 구현 */}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            cursor: pointer;

            transition: background-color 0.2s ease-in-out;

            &:hover {
              background-color: ${DESIGN_TOKEN_COLOR.gray300};
            }
          `}
          onClick={handleAnalysisClick}
        >
          <Icon icon="ic_after" size={1.2} color={DESIGN_TOKEN_COLOR.gray800} />
        </div>
      </section>
    </section>
  );
}
