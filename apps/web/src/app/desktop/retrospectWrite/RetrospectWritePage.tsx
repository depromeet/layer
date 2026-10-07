import AnalysisOverview from "../component/analysis/AnalysisOverview";
import { KakaoAdFit } from "@/component/common/KakaoAdFit";
import { css } from "@emotion/react";
import RetrospectWrite from "../component/retrospectWrite";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function RetroSpectWritePage() {
  const [searchParams] = useSearchParams();
  const [isOverviewVisible, setIsOverviewVisible] = useState(true);

  const spaceId = Number(searchParams.get("spaceId"));
  const retrospectId = searchParams.get("retrospectId");

  const handleToggleOverview = () => {
    setIsOverviewVisible(!isOverviewVisible);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          display: flex;
          flex: 1;
          min-height: 0;
          overflow-x: hidden;
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
      {/* TODO: 데스크톱 회고 작성 화면의 광고 배치를 디자인에 맞춰 조정한다. */}
      <KakaoAdFit />
    </div>
  );
}

export default RetroSpectWritePage;
