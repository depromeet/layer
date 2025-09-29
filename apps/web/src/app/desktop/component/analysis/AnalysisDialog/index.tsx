import { useState } from "react";
import { css } from "@emotion/react";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

import AnalysisHeader from "./AnalysisHeader";

export const ANALYSIS_MENU_TABS = ["질문", "개별", "분석"] as const;
export type AnalysisTab = (typeof ANALYSIS_MENU_TABS)[number];

type AnalysisDialogProps = {
  spaceId: string | null;
};

export default function AnalysisDialog({ spaceId }: AnalysisDialogProps) {
  const [selectedTab, setSelectedTab] = useState<AnalysisTab>(ANALYSIS_MENU_TABS[0]);

  const handleTabClick = (tab: AnalysisTab) => {
    setSelectedTab(tab);
  };

  return (
    <article
      css={css`
        width: 100%;
        padding: 2.4rem 3.2rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border-top-left-radius: 1.2rem;
        border-bottom-left-radius: 1.2rem;
      `}
    >
      <AnalysisHeader selectedTab={selectedTab} handleTabClick={handleTabClick} />
    </article>
  );
}
