import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import AnalyticsSummaryBox from "./AnalyticsSummaryBox";
import { Point } from "@/types/analysis";

type AnalyticsBoxProps = {
  type: "good" | "bad" | "improvement";
  analysis: Point[];
};

export default function AnalyticsBox({ type, analysis }: AnalyticsBoxProps) {
  console.log("analysis", analysis);

  const getAnalyticsConfig = (type: "good" | "bad" | "improvement") => {
    switch (type) {
      case "good":
        return {
          icon: "👍",
          title: "잘 하고 있어요",
        };
      case "bad":
        return {
          icon: "😢",
          title: "이런 점은 부족해요",
        };
      case "improvement":
        return {
          icon: "🙌",
          title: "개선이 필요해요",
        };
      default:
        return {
          icon: "👍",
          title: "잘 하고 있어요",
        };
    }
  };

  const config = getAnalyticsConfig(type);

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
          {config.icon}
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
          <AnalyticsSummaryBox key={item.spaceId} type={type} />
        ))}
      </section>
    </article>
  );
}
