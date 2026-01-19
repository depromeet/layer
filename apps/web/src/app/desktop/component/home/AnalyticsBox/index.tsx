import { Typography } from "@/component/common/typography";
import { css } from "@emotion/react";
import AnalyticsSummaryBox from "./AnalyticsSummaryBox";
import { Point } from "@/types/analysis";
import { getAnalysisConfig } from "@/utils/analysis/getAnalysisConfig";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Icon } from "@/component/common/Icon";

type AnalyticsBoxProps = {
  type: "good" | "bad" | "improvement";
  analysis: Point[];
};

export default function AnalyticsBox({ type, analysis }: AnalyticsBoxProps) {
  const config = getAnalysisConfig(type);

  return (
    <article
      css={css`
        width: 27.4rem;
      `}
    >
      {/* ---------- 제목 ---------- */}
      <section
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-bottom: 1.3rem;
        `}
      >
        <div
          css={css`
            width: 4.4rem;
            height: 4.4rem;
            background-color: ${DESIGN_TOKEN_COLOR.gray100};
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.8rem;
          `}
        >
          <Icon icon={config.emoji} size={config.iconSize} />
        </div>
        <Typography variant="title18Bold">{config.title}</Typography>
      </section>

      {/* ---------- 분석 내용 ---------- */}
      <section
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        `}
      >
        {analysis.map((item) => (
          <AnalyticsSummaryBox key={item.spaceId} type={type} analysis={item} />
        ))}
      </section>
    </article>
  );
}
