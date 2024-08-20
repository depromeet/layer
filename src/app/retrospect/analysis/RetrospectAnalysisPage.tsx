import { useLocation } from "react-router-dom";

import { TabButton } from "@/component/common/tabs/TabButton";
import { Tabs } from "@/component/common/tabs/Tabs";
import { Typography } from "@/component/common/typography";
import { useTabs } from "@/hooks/useTabs";
import { DualToneLayout } from "@/layout/DualToneLayout";

type RetrospectAnalysisPageState = {
  retrospectId: string;
  spaceId: string;
};

export const RetrospectAnalysisPage = () => {
  const location = useLocation();
  const state = location.state as RetrospectAnalysisPageState;
  const { retrospectId, spaceId } = state || {};
  console.log(retrospectId, spaceId);
  const tabMappings = {
    질문: "QUESTIONS",
    개별: "INDIVIDUAL_ANALYSIS",
    분석: "ANALYSIS",
  } as const;

  const tabNames = Object.keys(tabMappings) as Array<keyof typeof tabMappings>;
  const { tabs, curTab, selectTab } = useTabs(tabNames);
  const selectedTab = tabMappings[curTab];

  return (
    <DualToneLayout
      bottomTheme="gray"
      title={"중간 발표 회고"}
      TopComp={
        <>
          <Tabs tabs={tabs} curTab={curTab} selectTab={selectTab} TabComp={TabButton} fullWidth={false} />
        </>
      }
    >
      {selectedTab === "QUESTIONS" && (
        <div>
          <Typography>질문 컴포</Typography>
        </div>
      )}
      {selectedTab === "INDIVIDUAL_ANALYSIS" && (
        <div>
          <Typography>개별 컴포</Typography>
        </div>
      )}
      {selectedTab === "ANALYSIS" && (
        <div>
          <Typography>분석 컴포</Typography>
        </div>
      )}
    </DualToneLayout>
  );
};
