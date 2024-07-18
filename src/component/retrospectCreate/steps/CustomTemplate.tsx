import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { ProgressBar } from "@/component/common/ProgressBar";

type CustomTemplateProps = {
  curPage: number;
};

export function CustomTemplate({ curPage }: CustomTemplateProps) {
  const retroContext = useContext(RetrospectCreateContext);
  return <ProgressBar curPage={curPage} lastPage={retroContext.totalStepsCnt}></ProgressBar>;
}
