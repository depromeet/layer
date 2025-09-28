import { css } from "@emotion/react";

import ActionItems from "@/component/retrospect/space/ActionItems";
import CompletedRetrospects from "@/component/retrospect/space/CompletedRetrospects";
import InProgressRetrospects from "@/component/retrospect/space/InProgressRetrospects";

export default function AnalysisOverview() {
  return (
    <section
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
    </section>
  );
}
