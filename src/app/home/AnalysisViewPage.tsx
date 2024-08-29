import { css } from "@emotion/react";

import { UserProfileIcon } from "@/component/common/appBar";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Typography } from "@/component/common/typography";
import { RetrospectSummaryBox, SummaryInsightBox, EmptyAnalysis } from "@/component/home";
import { useApiGetMemberAnalysis } from "@/hooks/api/analysis/useApiGetMemberAnalysis";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";

export function AnalysisViewPage() {
  const { data, isLoading } = useApiGetMemberAnalysis();

  const hasRecentAnalyzes = data?.recentAnalyzes && data.recentAnalyzes.length !== 0;

  return (
    <DefaultLayout
      theme="gray"
      height="6.4rem"
      LeftComp={
        <Typography as="h1" variant="heading24Bold">
          분석
        </Typography>
      }
      RightComp={<UserProfileIcon />}
    >
      {isLoading ? (
        <LoadingModal />
      ) : !data || !hasRecentAnalyzes ? (
        <EmptyAnalysis />
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 1.7rem;
            margin-top: 1.7rem;
            margin-bottom: 8rem;
          `}
        >
          {hasRecentAnalyzes && <RetrospectSummaryBox recentAnalyzes={data.recentAnalyzes} />}
          {data?.goodAnalyzes && data.goodAnalyzes.length !== 0 && <SummaryInsightBox type="GOOD" insightArr={data.goodAnalyzes} />}
          {data?.badAnalyzes && data.badAnalyzes.length !== 0 && <SummaryInsightBox type="BAD" insightArr={data.badAnalyzes} />}
          {data?.improvementAnalyzes && data.improvementAnalyzes.length !== 0 && (
            <SummaryInsightBox type="IMPROVEMENT" insightArr={data.improvementAnalyzes} />
          )}
        </div>
      )}
    </DefaultLayout>
  );
}
