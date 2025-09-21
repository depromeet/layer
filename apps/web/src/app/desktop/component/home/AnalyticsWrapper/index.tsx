import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import AnalyticsBox from "../AnalyticsBox";

export default function AnalyticsWrapper() {
  // TODO: 분석 결과 API 요청 추가

  return (
    <article
      css={css`
        margin-top: 4.8rem;
      `}
    >
      {/* ---------- 제목 ---------- */}
      <section
        id="action-item-title"
        css={css`
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 0.7rem;
        `}
      >
        <Typography
          variant="body15Bold"
          color="gray800"
          css={css`
            display: flex;
            align-items: center;

            &::after {
              content: "";
              width: 0.1rem;
              height: 0.9rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray500};
              margin-left: 0.7rem;
            }
          `}
        >
          분석
        </Typography>
        <Typography variant="body15SemiBold" color="gray800">
          {2}개의 회고가 진행중이에요!
        </Typography>
      </section>

      {/* ---------- 분석 컨텐츠 ---------- */}
      <article
        css={css`
          display: flex;
          justify-content: space-between;
          height: 36.6rem;
          margin-top: 1.2rem;
          padding: 2.4rem 3.2rem;
          border-radius: 1.6rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
        `}
      >
        <AnalyticsBox />
        <AnalyticsBox />
        <AnalyticsBox />
      </article>
    </article>
  );
}
