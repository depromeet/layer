import { getAnalysisResponse } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer";
import AnalysisQuestionsTab from "./AnalysisQuestionsTab";
import AnalysisIndividualTab from "./AnalysisIndividualTab";
import AnalysisTab from "./AnalysisTab";
import { AnalysisTab as AnalysisTabType } from ".";
import AnalysisRetrospectTab from "./AnalysisRetrospectTab";

type AnalysisContentProps = {
  selectedTab: AnalysisTabType;
  analysisData: getAnalysisResponse;
  spaceId: number | null;
  retrospectId: number | null;
};

export default function AnalysisContent({ selectedTab, analysisData, spaceId, retrospectId }: AnalysisContentProps) {
  const { questions, individuals } = analysisData;
  const reactionProps = spaceId && retrospectId ? { spaceId, retrospectId } : null;

  return (
    <>
      {selectedTab === "회고" && <AnalysisRetrospectTab analysisData={analysisData} reactionProps={reactionProps} />}
      {selectedTab === "질문" && <AnalysisQuestionsTab questions={questions} reactionProps={reactionProps} />}
      {selectedTab === "개별" && <AnalysisIndividualTab individuals={individuals} reactionProps={reactionProps} />}
      {selectedTab === "분석" && <AnalysisTab analysisData={analysisData} />}
    </>
  );
}
