import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import AnalyticsBox from "../AnalyticsBox";
import { useApiGetMemberAnalysis } from "@/hooks/api/analysis/useApiGetMemberAnalysis";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";

export default function AnalyticsWrapper() {
  const { data: myAnalysis, isPending: isMyAnalysisPending } = useApiGetMemberAnalysis();

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
          {myAnalysis?.recentAnalyzes.length ?? 0}개의 회고가 진행중이에요!
        </Typography>
      </section>

      {/* ---------- 분석 컨텐츠 ---------- */}
      <article
        css={css`
          position: relative;
          display: flex;
          justify-content: space-between;
          height: 36.6rem;
          margin-top: 1.2rem;
          padding: 2.4rem 3.2rem;
          border-radius: 1.6rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
        `}
      >
        {isMyAnalysisPending && (
          <div
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            `}
          >
            <LoadingSpinner />
          </div>
        )}

        {!isMyAnalysisPending && myAnalysis && (
          <>
            <AnalyticsBox type="good" analysis={myAnalysis.goodAnalyzes} />
            <AnalyticsBox type="bad" analysis={myAnalysis.badAnalyzes} />
            <AnalyticsBox type="improvement" analysis={myAnalysis.improvementAnalyzes} />
          </>
        )}

        {!isMyAnalysisPending && !myAnalysis && <div>분석 결과가 없습니다.</div>}
      </article>
    </article>
  );
}
