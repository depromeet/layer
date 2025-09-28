import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { css } from "@emotion/react";

import { useApiOptionsGetRetrospects } from "@/hooks/api/retrospect/useApiOptionsGetRetrospects";
import RetrospectSection from "./RetrospectSection";
import { Typography } from "@/component/common/typography";
import { useAtomValue } from "jotai";
import { currentSpaceState } from "@/store/space/spaceAtom";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { Icon } from "@/component/common/Icon";

export default function AnalysisOverview() {
  const { spaceId } = useParams();

  const currentSelectedSpace = useAtomValue(currentSpaceState);

  const { name } = currentSelectedSpace || {};

  // * 스페이스 회고 목록 조회
  const { data: retrospects, isPending: isRetrospectsPending } = useQuery(useApiOptionsGetRetrospects(spaceId));

  // * 진행중인 회고 필터링
  const proceedingRetrospects = useMemo(() => retrospects?.filter((retrospect) => retrospect.retrospectStatus === "PROCEEDING") || [], [retrospects]);

  // * 마감된 회고 필터링
  const closedRetrospects = useMemo(() => retrospects?.filter((retrospect) => retrospect.retrospectStatus === "DONE") || [], [retrospects]);

  return (
    <section
      css={css`
        width: 34.4rem;
        margin-top: 3.2rem;
        padding: 0 3rem 3.2rem 1.8rem;
        box-sizing: border-box;
      `}
    >
      <section
        css={css`
          display: flex;
          align-items: center;
          gap: 0.4rem;
        `}
      >
        <Typography variant="heading24Bold" color="gray900">
          {name}
        </Typography>
        <Icon icon="ic_more" size={2.0} color={DESIGN_TOKEN_COLOR.gray900} />
      </section>

      <RetrospectSection
        title="진행중인 회고"
        isLoading={isRetrospectsPending}
        retrospects={proceedingRetrospects}
        emptyMessage="작성중인 회고가 없습니다."
      />

      <RetrospectSection
        title="마감된 회고"
        isLoading={isRetrospectsPending}
        retrospects={closedRetrospects}
        emptyMessage="마감된 회고가 없습니다."
      />
    </section>
  );
}
