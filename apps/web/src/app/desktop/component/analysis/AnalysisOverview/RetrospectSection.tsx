import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";
import type { Retrospect } from "@/types/retrospect";
import RetrospectCard from "../../home/RetrospectCard";

interface RetrospectSectionProps {
  title: string;
  isPending: boolean;
  retrospects: Retrospect[];
  emptyMessage: string;
  spaceId?: string | null;
}

const determineStatus = (isPending: boolean, retrospects: Retrospect[]): "loading" | "empty" | "success" => {
  if (isPending) {
    return "loading";
  }
  if (retrospects.length === 0) {
    return "empty";
  }
  return "success";
};

export default function RetrospectSection({ title, isPending, retrospects, emptyMessage, spaceId }: RetrospectSectionProps) {
  const status = determineStatus(isPending, retrospects);

  const contentMap = {
    // * Loading 상태인 경우
    loading: (
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
    ),

    // * 회고가 없는 경우
    empty: (
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
          {emptyMessage}
        </Typography>
      </div>
    ),

    // * 회고가 있는 경우
    success: retrospects.map((retrospect) => <RetrospectCard key={retrospect.retrospectId} retrospect={retrospect} spaceId={spaceId} />),
  };

  return (
    <>
      {/* ---------- 제목 ---------- */}
      <section
        css={css`
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 2.4rem;
        `}
      >
        <Typography variant="title16Strong" color="gray900">
          {title}
        </Typography>
        <Typography variant="title16Strong" color="gray600">
          {retrospects.length}
        </Typography>
      </section>

      {/* ---------- 회고 컨텐츠 ---------- */}
      <section
        css={css`
          margin-top: 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        `}
      >
        {contentMap[status]}
      </section>
    </>
  );
}
