import { getAnalysisResponse } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer";
import AnalysisQuestionsTab from "./AnalysisQuestionsTab";
import AnalysisIndividualTab from "./AnalysisIndividualTab";
import AnalysisTab from "./AnalysisTab";
import { AnalysisTab as AnalysisTabType } from ".";
import AnalysisRetrospectTab from "./AnalysisRetrospectTab";

type AnalysisContentProps = {
  selectedTab: AnalysisTabType;
  analysisData: getAnalysisResponse;
};

export default function AnalysisContent({ selectedTab, analysisData }: AnalysisContentProps) {
  const { questions, individuals } = analysisData;

  return (
    <>
      {selectedTab === "회고" && <AnalysisRetrospectTab analysisData={analysisData} />}
      {selectedTab === "질문" && <AnalysisQuestionsTab questions={questions} />}
      {selectedTab === "개별" && <AnalysisIndividualTab individuals={individuals} />}
      {selectedTab === "분석" && <AnalysisTab analysisData={analysisData} />}
    </>
  );
}
