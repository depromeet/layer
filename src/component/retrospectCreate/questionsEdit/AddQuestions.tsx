import { Tab } from "./Tab";

import { useTabs } from "@/hooks/useTabs";

export function AddQuestions() {
  const { tabs, curTab, selectTab } = useTabs(["직접 작성", "추천 질문"] as const);
  return (
    <>
      <Tab tabs={tabs} curTab={curTab} selectTab={selectTab} />
      {curTab === "직접 작성" && <div>huihi</div>}
    </>
  );
}
