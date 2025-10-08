import { css } from "@emotion/react";
import AnalysisOverview from "../component/analysis/AnalysisOverview";
import { useSearchParams } from "react-router-dom";
import AnalysisDialog from "../component/analysis/AnalysisDialog";
import { useState } from "react";

export default function AnalysisPage() {
  const [searchParams] = useSearchParams();
  const [isOverviewVisible, setIsOverviewVisible] = useState(true);

  const spaceId = searchParams.get("spaceId");
  const retrospectId = searchParams.get("retrospectId");

  const handleToggleOverview = () => {
    setIsOverviewVisible(!isOverviewVisible);
  };

  return (
    <section
      css={css`
        display: flex;
        overflow-x: hidden;
        height: 100vh;
      `}
    >
      <section
        css={css`
          width: ${isOverviewVisible ? "34.4rem" : "0"};
          opacity: ${isOverviewVisible ? 1 : 0};
          transition:
            width 0.3s ease-in-out,
            opacity 0.3s ease-in-out;
          overflow: hidden;
          will-change: width, opacity;
        `}
      >
        <AnalysisOverview spaceId={spaceId} />
      </section>

      <AnalysisDialog spaceId={spaceId} retrospectId={retrospectId} isOverviewVisible={isOverviewVisible} onToggleOverview={handleToggleOverview} />
    </section>
  );
}
