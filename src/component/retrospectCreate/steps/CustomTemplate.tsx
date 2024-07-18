import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { Icon } from "@/component/common/Icon";
import { ProgressBar } from "@/component/common/ProgressBar";
import { DefaultLayout } from "@/layout/DefaultLayout";

type CustomTemplateProps = {
  curPage: number;
};

export function CustomTemplate({ curPage }: CustomTemplateProps) {
  const retroContext = useContext(RetrospectCreateContext);
  return (
    <DefaultLayout LeftComp={<Icon icon={"ic_arrow_back"} onClick={retroContext.goPrev} />}>
      <ProgressBar curPage={curPage} lastPage={retroContext.totalStepsCnt} />
    </DefaultLayout>
  );
}
