import { getAnalysisResponse } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer";
import { css } from "@emotion/react";

type AnalysisRetrospectTabProps = {
  analysisData: getAnalysisResponse;
};

export default function AnalysisRetrospectTab({ analysisData }: AnalysisRetrospectTabProps) {
  return <section css={css``}>회고 탭</section>;
}
