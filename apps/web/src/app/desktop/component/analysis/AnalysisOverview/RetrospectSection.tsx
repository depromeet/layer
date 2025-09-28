import { css } from "@emotion/react";
import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";
import InProgressRetrospectCard from "../../home/InProgressRetrospectCard";
import type { Retrospect } from "@/types/retrospect"; // Retrospect 타입을 가져옵니다.

interface RetrospectSectionProps {
  title: string;
  isLoading: boolean;
  retrospects: Retrospect[];
  emptyMessage: string;
}

export default function RetrospectSection({ title, isLoading, retrospects, emptyMessage }: RetrospectSectionProps) {
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
        <Typography variant="title16Bold2" color="gray900">
          {title}
        </Typography>
        <Typography variant="title16Bold2" color="gray600">
          {retrospects.length}
        </Typography>
      </section>

      {/* ---------- 회고 컨텐츠 ---------- */}
      <section
        css={css`
          margin-top: 1.6rem;
        `}
      >
        {isLoading ? (
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
        ) : retrospects.length === 0 ? (
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
        ) : (
          retrospects.map((retrospect) => <InProgressRetrospectCard key={retrospect.retrospectId} retrospect={retrospect} />)
        )}
      </section>
    </>
  );
}
