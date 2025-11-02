import { useState } from "react";
import { css } from "@emotion/react";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import ActionItemsTab from "@/component/retrospect/space/actionItems/ActionItemsTab";
import { ActionItemsList } from "./ActionItemsList";

interface ActionItemsProps {
  currentTab: "진행중" | "지난";
}

export default function ActionItems() {
  const [currentTab, setCurrentTab] = useState<ActionItemsProps["currentTab"]>("진행중");
  const handleCurrentTabClick = (tab: ActionItemsProps["currentTab"]) => {
    setCurrentTab(tab);
  };

  return (
    <section
      css={css`
        width: 100%;
        height: 100%;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border-radius: 1.2rem;
        display: flex;
        flex-direction: column;
      `}
    >
      <ActionItemsTab currentTab={currentTab} handleCurrentTabClick={handleCurrentTabClick} />
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
        `}
      >
        <ActionItemsList currentTab={currentTab} />
      </div>
    </section>
  );
}
