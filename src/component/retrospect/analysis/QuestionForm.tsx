import { useState } from "react";

import { ResultContainer } from "@/component/retrospect/analysis/ResultContainer.tsx";
import { getAnalysisResponse } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer.ts";

export function QuestionForm({ data }: { data: getAnalysisResponse }) {
  const [page, setPage] = useState(0);
  const handleIncrement = () => {
    setPage(page + 1);
  };

  const handleDecrement = () => {
    setPage(page - 1);
  };
  return <ResultContainer data={data} page={page} handleDecrement={handleDecrement} handleIncrement={handleIncrement} type={"question"} />;
}
