import { Typography } from "@/component/common/typography";
import { css } from "@emotion/react";

import InProgressRetrospectCard from "../../home/InProgressRetrospectCard";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";
import { useApiOptionsGetRetrospects } from "@/hooks/api/retrospect/useApiOptionsGetRetrospects";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function InProgressRetrospectsWrapper() {
  const { spaceId } = useParams();

  // * 스페이스 회고 목록 조회
  const { data: retrospects, isPending: isRetrospectsPending } = useQuery(useApiOptionsGetRetrospects(spaceId));

  // * 진행중인 회고 필터링
  const proceedingRetrospects = useMemo(() => retrospects?.filter((retrospect) => retrospect.retrospectStatus === "PROCEEDING") || [], [retrospects]);

  return (
    <section
      css={css`
        width: 34.4rem;
        margin-top: 3.2rem;
        padding: 0 3rem 3.2rem 1.8rem;
        box-sizing: border-box;
      `}
    >
      {/* ---------- 제목 ---------- */}
      <section
        css={css`
          display: flex;
          align-items: center;
          gap: 0.6rem;
        `}
      >
        <Typography variant="title16Bold2" color="gray900">
          진행중인 회고
        </Typography>
        <Typography variant="title16Bold2" color="gray600">
          {proceedingRetrospects?.length || 0}
        </Typography>
      </section>

      <section
        css={css`
          margin-top: 1.6rem;
        `}
      >
        {isRetrospectsPending ? (
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 13.8rem;
              border-radius: 1.2rem;
              border: 1px dashed ${DESIGN_TOKEN_COLOR.gray500};
            `}
          >
            <LoadingSpinner />
          </div>
        ) : !retrospects || proceedingRetrospects.length === 0 ? (
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 13.8rem;
              background-color: ${DESIGN_TOKEN_COLOR.gray100};
              border-radius: 1.2rem;
              border: 1px dashed ${DESIGN_TOKEN_COLOR.gray500};
            `}
          >
            <Typography variant="body14Medium" color="gray800">
              작성중인 회고가 없습니다.
            </Typography>
          </div>
        ) : (
          proceedingRetrospects.map((retrospect) => <InProgressRetrospectCard key={retrospect.retrospectId} retrospect={retrospect} />)
        )}
      </section>
    </section>
  );
}
