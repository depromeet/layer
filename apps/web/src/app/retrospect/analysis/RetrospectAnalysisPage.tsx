import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { LoadingModal } from "@/component/common/Modal/LoadingModal.tsx";
import { TabButton } from "@/component/common/tabs/TabButton";
import { Tabs } from "@/component/common/tabs/Tabs";
import { AnalysisContainer } from "@/component/retrospect/analysis/Analysis";
import { PersonalForm } from "@/component/retrospect/analysis/PersonalForm.tsx";
import { QuestionForm } from "@/component/retrospect/analysis/QuestionForm.tsx";
import { useGetAnalysisAnswer } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer.ts";
import { useTabs } from "@/hooks/useTabs";
import { DualToneLayout } from "@/layout/DualToneLayout";
import { EmptyList } from "@/component/common/empty";

export const RetrospectAnalysisPage = () => {
  const { title, defaultTab } = useLocation().state as { title: string; defaultTab: "질문" | "개별" | "분석" };

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
  useEffect(() => {
    if (defaultTab) {
      selectTab(defaultTab);
    }
  }, []);
  return (
    <DualToneLayout
      bottomTheme="gray"
      title={title}
      TopComp={
        <Fragment>
          <Tabs tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TabButton} fullWidth={false} />
        </Fragment>
      }
    >
      {isLoading && <LoadingModal />}
      {!data || data.individuals.length === 0 ? (
        <EmptyList icon={"ic_clock"} message={"제출된 회고가 없어요"} />
      ) : (
        {
          QUESTIONS: <QuestionForm data={data} />,
          INDIVIDUAL_ANALYSIS: <PersonalForm data={data} />,
          ANALYSIS: <AnalysisContainer spaceId={spaceId!} retrospectId={retrospectId!} hasAIAnalyzed={data?.hasAIAnalyzed} />,
        }[selectedTab]
      )}
    </DualToneLayout>
  );
};
