import { css } from "@emotion/react";
import InProgressRetrospectsWrapper from "../component/analysis/AnalysisOverview/InProgressRetrospectsWrapper";

export default function AnalysisPage() {
  return (
    <section
      css={css`
        padding: 2.8rem 0;
      `}
    >
      <InProgressRetrospectsWrapper />
    </section>
  );
}
