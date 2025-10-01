import { css } from "@emotion/react";
import { useState } from "react";

import TeamIndividualToggle from "./TeamIndividualToggle";

type ViewType = "개인" | "팀";

export default function AnalysisTab() {
  const [selectedView, setSelectedView] = useState<ViewType>("개인");

  const handleToggle = (view: ViewType) => {
    setSelectedView(view);
  };

  return (
    <section
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        overflow-x: auto;
        overflow-y: auto;
        min-height: 80vh;
      `}
    >
      <TeamIndividualToggle selectedView={selectedView} handleToggle={handleToggle} />

      <div
        css={css`
          flex: 1;
        `}
      >
        {selectedView === "개인" ? <div>개인 분석 콘텐츠</div> : <div>팀 분석 콘텐츠</div>}
      </div>
    </section>
  );
}
