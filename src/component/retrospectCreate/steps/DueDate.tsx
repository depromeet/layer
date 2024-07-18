import { useContext } from "react";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import { Icon } from "@/component/common/Icon";
import { ProgressBar } from "@/component/common/ProgressBar";
import { DefaultLayout } from "@/layout/DefaultLayout";

type DueDateProps = {
  // curPage: number;
};

export function DueDate() {
  const retroContext = useContext(RetrospectCreateContext);
  return <>hi</>;
}
