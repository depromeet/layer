import { useState, useMemo, useEffect } from "react";
import { css } from "@emotion/react";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

import AnalysisHeader from "./AnalysisHeader";
import AnalysisContent from "./AnalysisContent";
import { useGetAnalysisAnswer } from "@/hooks/api/retrospect/analysis/useGetAnalysisAnswer";
import { LoadingSpinner } from "@/component/space/view/LoadingSpinner";

export const TEAM_ANALYSIS_MENU_TABS = ["질문", "개별", "분석"] as const;
export const PERSONAL_ANALYSIS_MENU_TABS = ["회고", "분석"] as const;
export type AnalysisTab = (typeof TEAM_ANALYSIS_MENU_TABS)[number] | (typeof PERSONAL_ANALYSIS_MENU_TABS)[number];

type AnalysisDialogProps = {
  spaceId: string | null;
  retrospectId: string | null;
  isOverviewVisible: boolean;
  onToggleOverview: () => void;
};

export default function AnalysisDialog({ spaceId, retrospectId, isOverviewVisible, onToggleOverview }: AnalysisDialogProps) {
  const { data: analysisData, isPending: isPendingAnalysisData } = useGetAnalysisAnswer({ spaceId: spaceId, retrospectId: retrospectId });

  const isPersonal = Boolean(analysisData?.individuals.length === 1);

  const initialTab = useMemo(() => {
    return isPersonal ? PERSONAL_ANALYSIS_MENU_TABS[0] : TEAM_ANALYSIS_MENU_TABS[0];
  }, [isPersonal]);

  const [selectedTab, setSelectedTab] = useState<AnalysisTab>(initialTab);

  const handleTabClick = (tab: AnalysisTab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const currentTabs = isPersonal ? PERSONAL_ANALYSIS_MENU_TABS : TEAM_ANALYSIS_MENU_TABS;
    if (!currentTabs.includes(selectedTab as any)) {
      setSelectedTab(currentTabs[0]);
    }
  }, [isPersonal, selectedTab]);

  return (
    <article
      css={css`
        flex: 1;
        height: 100vh;
        padding: 2.4rem 3.2rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border-top-left-radius: 1.2rem;
        border-bottom-left-radius: 1.2rem;
        overflow: hidden;
        transition: flex 0.3s ease-in-out;
        min-width: 85rem;
      `}
    >
      <AnalysisHeader
        selectedTab={selectedTab}
        isPersonal={isPersonal}
        isOverviewVisible={isOverviewVisible}
        handleTabClick={handleTabClick}
        onToggleOverview={onToggleOverview}
      />

      {isPendingAnalysisData && <LoadingSpinner />}

      {!isPendingAnalysisData && analysisData && <AnalysisContent selectedTab={selectedTab} analysisData={analysisData} />}
    </article>
  );
}
