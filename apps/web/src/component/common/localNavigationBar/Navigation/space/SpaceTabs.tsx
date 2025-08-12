import { css } from "@emotion/react";

import { Typography } from "@/component/common/typography";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { SPACE_TABS } from "../../constants";

interface SpaceTabsProps {
  isCollapsed: boolean;
  currentTab: "전체" | "개인" | "팀";
  handleCurrentTabClick: (tab: "전체" | "개인" | "팀") => void;
}

export default function SpaceTabs({ isCollapsed, currentTab, handleCurrentTabClick }: SpaceTabsProps) {
  return (
    <div
      css={css`
        display: flex;
        gap: 1.2rem;
        overflow: hidden;
        transition:
          height 0.3s ease-in-out,
          opacity 0.3s ease-in-out,
          margin 0.3s ease-in-out;

        ${isCollapsed
          ? css`
              height: 0;
              margin: 0;
              opacity: 0;
              visibility: hidden;
            `
          : css`
              height: 4.4rem;
              margin: 0.4rem 0.8rem 0 0.8rem;
              opacity: 1;
              visibility: visible;
            `}
      `}
    >
      {SPACE_TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => handleCurrentTabClick(tab)}
          css={css`
            position: relative;
            background: none;
            border: none;
            padding: 0.6rem 0rem;

            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 2px;
              background-color: ${DESIGN_TOKEN_COLOR.gray900};
              transform: scaleX(${tab === currentTab ? 1 : 0});
              transition: transform 0.3s ease-in-out;
              transform-origin: center;
            }
          `}
        >
          <Typography variant="subtitle14SemiBold" color={tab === currentTab ? "gray900" : "gray500"}>
            {tab}
          </Typography>
        </button>
      ))}
    </div>
  );
}
