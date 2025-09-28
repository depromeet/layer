import { css } from "@emotion/react";
import AnalysisOverview from "../component/analysis/AnalysisOverview";

export default function AnalysisPage() {
  return (
    <section
      css={css`
        padding: 2.8rem 0;
      `}
    >
      <AnalysisOverview />
    </section>
  );
}
