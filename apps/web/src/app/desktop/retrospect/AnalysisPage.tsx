import { css } from "@emotion/react";
import AnalysisOverview from "../component/analysis/AnalysisOverview";
import { useSearchParams } from "react-router-dom";
import AnalysisDialog from "../component/analysis/AnalysisDialog";

export default function AnalysisPage() {
  const [searchParams] = useSearchParams();

  const spaceId = searchParams.get("spaceId");
  const retrospectId = searchParams.get("retrospectId");

  return (
    <section
      css={css`
        display: flex;
        overflow-x: hidden;
        height: 100vh;
      `}
    >
      <AnalysisOverview spaceId={spaceId} />

      <AnalysisDialog spaceId={spaceId} retrospectId={retrospectId} />
    </section>
  );
}
