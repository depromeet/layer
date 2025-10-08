import { getAnalysisResponse } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer";
import AnalysisQuestionsTab from "./AnalysisQuestionsTab";
import AnalysisIndividualTab from "./AnalysisIndividualTab";
import AnalysisTab from "./AnalysisTab";

type AnalysisContentProps = {
  selectedTab: "질문" | "개별" | "분석";
  analysisData: getAnalysisResponse;
};

export default function AnalysisContent({ selectedTab, analysisData }: AnalysisContentProps) {
  const { questions, individuals } = analysisData;

  return (
    <>
      {selectedTab === "질문" && <AnalysisQuestionsTab questions={questions} />}
      {selectedTab === "개별" && <AnalysisIndividualTab individuals={individuals} />}
      {selectedTab === "분석" && <AnalysisTab />}
    </>
  );
}
