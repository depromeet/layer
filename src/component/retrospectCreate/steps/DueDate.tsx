import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { ProgressBar } from "@/component/common/ProgressBar";

type DueDateProps = {
  curPage: number;
};

export function DueDate({ curPage }: DueDateProps) {
  const retroContext = useContext(RetrospectCreateContext);
  return <ProgressBar curPage={curPage} lastPage={retroContext.totalStepsCnt}></ProgressBar>;
}
