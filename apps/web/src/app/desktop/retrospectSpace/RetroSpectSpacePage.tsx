import ActionItems from "@/component/retrospect/space/ActionItems";
import CompletedRetrospects from "@/component/retrospect/space/CompletedRetrospects";
import InProgressRetrospects from "@/component/retrospect/space/InProgressRetrospects";
import RetrospectSpaceHeader from "@/component/retrospect/space/RetrospectSpaceHeader";
import { css } from "@emotion/react";

export default function RetroSpectSpacePage() {
  return (
    <section
      css={css`
        width: 100%;
        height: 100vh;
        padding: 28px 20px 0 20px;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;

        /* 모바일 대응 */
        @media (max-width: 979px) {
          gap: 1.6rem;
        }
      `}
    >
      <RetrospectSpaceHeader />

      {/* 데스크탑 레이아웃 (980px 이상) */}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          flex: 1;
          overflow: hidden;

          @media (max-width: 979px) {
            display: none;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 4rem;
          `}
        >
          <InProgressRetrospects />
          <CompletedRetrospects />
        </div>
        <ActionItems />
      </div>

      {/* 모바일 레이아웃 (980px 미만) */}
      <div
        css={css`
          display: none;
          gap: 2.4rem;
          flex: 1;
          overflow-y: auto;

          @media (max-width: 979px) {
            display: flex;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 4rem;
          `}
        >
          <InProgressRetrospects />
          <CompletedRetrospects />
        </div>
        <ActionItems />
      </div>
    </section>
  );
}
