import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import AnalyticsBox from "../AnalyticsBox";
import { useApiGetMemberAnalysis } from "@/hooks/api/analysis/useApiGetMemberAnalysis";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";

export default function AnalyticsWrapper() {
  const { data: myAnalysis, isPending: isMyAnalysisPending, isError: isMyAnalysisError } = useApiGetMemberAnalysis();

  // 컨텐츠 렌더링 함수
  const renderContent = () => {
    // * ---------- 로딩 중일 때 ---------- * //
    if (isMyAnalysisPending) {
      return (
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
      );
    }

    // * ---------- 에러가 발생했을 때 ---------- * //
    if (isMyAnalysisError) {
      return <Typography variant="body15Medium">분석 결과를 불러오는 중 오류가 발생했어요.</Typography>;
    }

    // * ---------- 데이터가 있을 때 ---------- * //
    if (myAnalysis) {
      if (myAnalysis.goodAnalyzes.length === 0 && myAnalysis.badAnalyzes.length === 0 && myAnalysis.improvementAnalyzes.length === 0) {
        return (
          <section
            css={css`
              width: 100%;
              height: 20rem;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: ${DESIGN_TOKEN_COLOR.gray00};
            `}
          >
            <Typography variant="body14Medium" color="gray700">
              분석 결과가 없습니다.
            </Typography>
          </section>
        );
      }

      return (
        <>
          <AnalyticsBox type="good" analysis={myAnalysis.goodAnalyzes} />
          <AnalyticsBox type="bad" analysis={myAnalysis.badAnalyzes} />
          <AnalyticsBox type="improvement" analysis={myAnalysis.improvementAnalyzes} />
        </>
      );
    }

    // * ---------- 에러 또는 데이터 없음 ---------- * //
    return (
      <section
        css={css`
          width: 100%;
          height: 20rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
        `}
      >
        <Typography variant="body14Medium" color="gray700">
          분석 결과가 없습니다.
        </Typography>
      </section>
    );
  };

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
          {myAnalysis?.recentAnalyzes.length ?? 0}개의 회고가 진행 중이에요!
        </Typography>
      </section>

      {/* ---------- 분석 컨텐츠 ---------- */}
      <article
        css={css`
          position: relative;
          display: flex;
          justify-content: space-between;
          min-height: 36.6rem;
          margin-top: 1.2rem;
          padding: 2.4rem 3.2rem;
          border-radius: 1.6rem;
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
        `}
      >
        {renderContent()}
      </article>
    </article>
  );
}
