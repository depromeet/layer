import { Fragment } from "react";

import { LoadingModal } from "@/component/common/Modal/LoadingModal.tsx";
import { TabButton } from "@/component/common/tabs/TabButton";
import { Tabs } from "@/component/common/tabs/Tabs";
import { AnalysisContainer } from "@/component/retrospect/analysis/Analysis";
import { PersonalForm } from "@/component/retrospect/analysis/PersonalForm.tsx";
import { QuestionForm } from "@/component/retrospect/analysis/QuestionForm.tsx";
import { useGetAnalysisAnswer } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer.ts";
import { useTabs } from "@/hooks/useTabs";
import { DualToneLayout } from "@/layout/DualToneLayout";

export const RetrospectAnalysisPage = () => {
  const tabMappings = {
    질문: "QUESTIONS",
    개별: "INDIVIDUAL_ANALYSIS",
    분석: "ANALYSIS",
  } as const;

  const tabNames = Object.keys(tabMappings) as Array<keyof typeof tabMappings>;
  const { tabs, curTab, selectTab } = useTabs(tabNames);
  const selectedTab = tabMappings[curTab];
  const queryParams = new URLSearchParams(location.search);
  const spaceId = queryParams.get("spaceId");
  const retrospectId = queryParams.get("retrospectId");
  const { data, isLoading } = useGetAnalysisAnswer({ spaceId: spaceId!, retrospectId: retrospectId! });

  return (
    <DualToneLayout
      bottomTheme="gray"
      title={"중간 발표 회고"}
      TopComp={
        <Fragment>
          <Tabs tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TabButton} fullWidth={false} />
        </Fragment>
      }
    >
      {isLoading && <LoadingModal />}
      {
        {
          QUESTIONS: <QuestionForm data={data!} />,
          INDIVIDUAL_ANALYSIS: <PersonalForm data={data!} />,
          ANALYSIS: <AnalysisContainer />,
        }[selectedTab]
      }
    </DualToneLayout>
  );
};
