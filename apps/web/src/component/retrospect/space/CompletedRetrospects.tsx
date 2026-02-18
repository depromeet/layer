import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useApiOptionsGetRetrospects } from "@/hooks/api/retrospect/useApiOptionsGetRetrospects";
import { useMemo } from "react";
import RetrospectCard from "@/app/desktop/component/home/RetrospectCard";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";

export default function CompletedRetrospects() {
  const { spaceId } = useParams();

  // * 스페이스 회고 목록 조회
  const { data: retrospects, isPending: isPendingRetrospects } = useQuery(useApiOptionsGetRetrospects(spaceId));

  // * 마감된 회고 필터링
  const completedRetrospects = useMemo(() => retrospects?.filter((retrospect) => retrospect.retrospectStatus === "DONE") || [], [retrospects]);

  if (isPendingRetrospects) {
    return <LoadingSpinner />;
  }

  return (
    <section
      css={css`
        width: 100%;
        margin: 0 auto;
        max-width: 92.8rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        min-width: 30rem;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 0.6rem;
        `}
      >
        <Typography variant="title16Bold">마감된 회고 </Typography>
            <Typography variant="title16Bold" color="gray600">
              {completedRetrospects?.length}
            </Typography>
      </div>

      {completedRetrospects.length === 0 ? (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20rem 2rem;
            text-align: center;
            gap: 2.4rem;
            border: 1px dashed rgba(0, 0, 0, 0.12);
            border-radius: 1.2rem;
            margin-top: 1.6rem;
            margin-bottom: 1.6rem;
            flex: 1;
          `}
        >
          <Icon icon="ic_new_clock" size={7.2} color={DESIGN_TOKEN_COLOR.gray500} />
          <Typography
            variant="body16Medium"
            color="gray500"
            css={css`
              text-align: center;
              white-space: pre-wrap;
            `}
          >
            {"마감된 회고가 없어요\n회고 후 분석 내용을 받아보세요!"}
          </Typography>
        </div>
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 1.6rem;
            padding-top: 1.6rem;
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            padding-bottom: 2rem;
          `}
        >
          {completedRetrospects.map((retrospect) => (
            <RetrospectCard key={retrospect.retrospectId} retrospect={retrospect} spaceId={spaceId} />
          ))}
        </div>
      )}
    </section>
  );
}
