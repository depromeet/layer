import { css } from "@emotion/react";

import { UserProfileIcon } from "@/component/common/appBar";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { Typography } from "@/component/common/typography";
import { RetrospectSummaryBox, SummaryInsightBox } from "@/component/home";
import { useApiGetMemberAnalysis } from "@/hooks/api/analysis/useApiGetMemberAnalysis";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";

export function AnalysisViewPage() {
  const { data, isLoading } = useApiGetMemberAnalysis();
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
      {isLoading && <LoadingModal />}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1.7rem;
          margin-top: 1.7rem;
          margin-bottom: 8rem;
        `}
      >
        <RetrospectSummaryBox recentAnalyzes={data!.recentAnalyzes} />
        <SummaryInsightBox />
        <SummaryInsightBox />
        <SummaryInsightBox />
      </div>
      {/**<EmptyAnalysis />**/}
    </DefaultLayout>
  );
}
