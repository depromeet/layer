import { css } from "@emotion/react";
import { useState } from "react";

import TeamIndividualToggle from "./TeamIndividualToggle";
import AnalysisIndividualContents from "./AnalysisIndividualContents";
import AnalysisTeamContents from "./AnalysisTeamContents";
import { useApiGetAnalysis } from "@/hooks/api/analysis/useApiGetAnalysis";
import { useSearchParams } from "react-router-dom";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { getAnalysisResponse } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer";
import { AnalysisingComp } from "@/component/retrospect/analysis/Analysis";

type ViewType = "개인" | "팀";

type AnalysisTabProps = {
  analysisData: getAnalysisResponse;
};

export default function AnalysisTab({ analysisData }: AnalysisTabProps) {
  const [searchParams] = useSearchParams();

  const spaceId = searchParams.get("spaceId");
  const retrospectId = searchParams.get("retrospectId");

  const { hasAIAnalyzed } = analysisData;

  const { data: analysisRetrospectsData, isPending: isPendingAnalysisData } = useApiGetAnalysis({
    spaceId: spaceId || "",
    retrospectId: retrospectId || "",
  });

  const [selectedView, setSelectedView] = useState<ViewType>("개인");

  const handleToggle = (view: ViewType) => {
    setSelectedView(view);
  };

  if (isPendingAnalysisData) {
    return <LoadingModal />;
  }

  if (hasAIAnalyzed == false) {
    return <AnalysisingComp />;
  }

  return (
    <section
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        overflow-x: auto;
        overflow-y: auto;
        min-height: 80vh;
      `}
    >
      <TeamIndividualToggle selectedView={selectedView} handleToggle={handleToggle} />

      <div
        css={css`
          flex: 1;
        `}
      >
        {selectedView === "개인" ? (
          <AnalysisIndividualContents individualAnalysis={analysisRetrospectsData?.individualAnalyze} />
        ) : (
          <AnalysisTeamContents teamAnalyze={analysisRetrospectsData?.teamAnalyze} />
        )}
      </div>
    </section>
  );
}
