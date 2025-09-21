import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import AnalyticsSummaryBox from "./AnalyticsSummaryBox";

export default function AnalyticsBox() {
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
            background-color: ${DESIGN_TOKEN_COLOR.gray200};
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.8rem;
          `}
        >
          👍
        </div>
        <Typography variant="title18Bold">잘 하고 있어요</Typography>
      </section>

      {/* ---------- 분석 내용 ---------- */}
      <section
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        `}
      >
        <AnalyticsSummaryBox />
        <AnalyticsSummaryBox />
        <AnalyticsSummaryBox />
      </section>
    </article>
  );
}
