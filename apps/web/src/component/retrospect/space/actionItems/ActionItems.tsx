import { useState } from "react";

import { Typography } from "@/component/common/typography";
import { css } from "@emotion/react";
import { Icon } from "@/component/common/Icon";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

import ActionItemsTab from "./ActionItemsTab";
import ActionItemsList from "./ActionItemsList";
import ActionItemsTooltip from "./ActionItemsTooltip";

interface ActionItemsProps {
  currentTab: "진행 중" | "지난";
}

export default function ActionItems() {
  const [currentTab, setCurrentTab] = useState<ActionItemsProps["currentTab"]>("진행 중");
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleCurrentTabClick = (tab: ActionItemsProps["currentTab"]) => {
    setCurrentTab(tab);
  };

  return (
    <section
      css={css`
        flex: 1;
        width: 100%;
        max-width: 30.6rem;
        min-width: 28.6rem;
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        border-radius: 1.2rem;
        padding: 1.8rem;
        display: flex;
        flex-direction: column;
        margin-bottom: 1.6rem;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding-bottom: 1.2rem;
          margin-bottom: 1.2rem;
          border-bottom: 1px solid ${DESIGN_TOKEN_COLOR.gray100};
          flex-shrink: 0;
          position: relative;
        `}
      >
        <Typography variant="title16Bold">실행목표</Typography>

        {/* ---------- 툴팁 컨테이너 ---------- */}
        <div
          css={css`
            position: relative;
            display: inline-block;
          `}
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          <Icon
            icon="ic_info_transparent"
            size={2}
            css={css`
              path {
                fill: ${DESIGN_TOKEN_COLOR.gray600};
              }
              cursor: pointer;
              transition: opacity 0.2s ease;

              &:hover {
                opacity: 0.8;
              }
            `}
          />

          {/* ---------- 커스텀 툴팁 ---------- */}
          <ActionItemsTooltip isVisible={isTooltipVisible} />
        </div>
      </div>

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
