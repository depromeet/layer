import { css } from "@emotion/react";
import AnalysisOverview from "../component/analysis/AnalysisOverview";

export default function AnalysisPage() {
  return (
    <section
      css={css`
        /* padding: 2.8rem 0; */
        padding-top: 2.8rem;
        height: 100vh;
      `}
    >
      <AnalysisOverview />
    </section>
  );
}
