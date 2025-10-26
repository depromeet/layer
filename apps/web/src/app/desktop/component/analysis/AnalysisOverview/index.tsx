import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { css } from "@emotion/react";
import { useApiOptionsGetRetrospects } from "@/hooks/api/retrospect/useApiOptionsGetRetrospects";

import RetrospectSection from "./RetrospectSection";
import AnalysisOverviewHeader from "./AnalysisOverviewHeader";

type AnalysisOverviewProps = {
  spaceId: string | null;
};

export default function AnalysisOverview({ spaceId }: AnalysisOverviewProps) {
  // * 스페이스 회고 목록 조회
  const { data: retrospects, isPending: isRetrospectsPending } = useQuery(useApiOptionsGetRetrospects(spaceId || undefined));

  // * 진행중인 회고 필터링
  const proceedingRetrospects = useMemo(() => retrospects?.filter((retrospect) => retrospect.retrospectStatus === "PROCEEDING") || [], [retrospects]);

  // * 마감된 회고 필터링
  const closedRetrospects = useMemo(() => retrospects?.filter((retrospect) => retrospect.retrospectStatus === "DONE") || [], [retrospects]);

  return (
    <section
      css={css`
        width: 34.4rem;
        padding: 2.8rem 3rem 3.2rem 1.8rem;
        box-sizing: border-box;
      `}
    >
      <AnalysisOverviewHeader />

      <RetrospectSection
        title="진행중인 회고"
        isPending={isRetrospectsPending}
        retrospects={proceedingRetrospects}
        emptyMessage="작성중인 회고가 없습니다."
        spaceId={spaceId}
      />

      <RetrospectSection
        title="마감된 회고"
        isPending={isRetrospectsPending}
        retrospects={closedRetrospects}
        emptyMessage="마감된 회고가 없습니다."
        spaceId={spaceId}
      />
    </section>
  );
}
