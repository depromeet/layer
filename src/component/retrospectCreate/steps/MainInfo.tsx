import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { ProgressBar } from "@/component/common/ProgressBar";

type MainInfoProps = {
  curPage: number;
};

export function MainInfo({ curPage }: MainInfoProps) {
  const retroContext = useContext(RetrospectCreateContext);
  return (
    <>
      <ProgressBar curPage={curPage} lastPage={retroContext.totalStepsCnt} />
      <div>main</div>
    </>
  );
}
