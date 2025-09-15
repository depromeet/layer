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
        padding: 28px 40px 0 40px;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
      `}
    >
      <RetrospectSpaceHeader />
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          flex: 1;
          overflow: hidden;
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
    </section>
  );
}
