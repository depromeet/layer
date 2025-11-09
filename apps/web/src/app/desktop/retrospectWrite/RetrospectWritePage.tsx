import AnalysisOverview from "../component/analysis/AnalysisOverview";
import { css } from "@emotion/react";
import RetrospectWrite from "../component/retrospectWrite";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function RetroSpectWritePage() {
  const [searchParams] = useSearchParams();
  const [isOverviewVisible, setIsOverviewVisible] = useState(true);

  const spaceId = searchParams.get("spaceId");
  const retrospectId = searchParams.get("retrospectId");

  const handleToggleOverview = () => {
    setIsOverviewVisible(!isOverviewVisible);
  };

  return (
    <div
      css={css`
        display: flex;
        overflow-x: hidden;
        height: 100vh;
      `}
    >
      <section
        css={css`
          width: ${isOverviewVisible ? "34.4rem" : "0"};
          height: 100%;
          opacity: ${isOverviewVisible ? 1 : 0};
          transition:
            width 0.3s ease-in-out,
            opacity 0.3s ease-in-out;
          overflow-y: auto;
          will-change: width, opacity;
        `}
      >
        <AnalysisOverview spaceId={spaceId} />
      </section>
      <RetrospectWrite key={retrospectId} isOverviewVisible={isOverviewVisible} handleToggleOverview={handleToggleOverview} />
    </div>
  );
}

export default RetroSpectWritePage;
