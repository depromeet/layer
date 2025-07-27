import { css } from "@emotion/react";

import CollapsedHomeButton from "./CollapsedHomeButton";
import HomeButton from "./HomeButton";
import CollapsedHeaderSpaceAddButton from "./space/CollapsedHeaderSpaceAddButton";
import HeaderSpaceAddButton from "./space/HeaderSpaceAddButton";
import SpacesList from "./space/SpacesList";
import SpaceTabs from "./space/SpaceTabs";

interface NavigationProps {
  isCollapsed: boolean;
  currentTab: "전체" | "개인" | "팀";
  handleCurrentTabClick: (tab: "전체" | "개인" | "팀") => void;
}

export default function Navigation({ isCollapsed, currentTab, handleCurrentTabClick }: NavigationProps) {
  return (
    <nav
      css={css`
        flex: 1;
        overflow-y: auto;
        padding: ${isCollapsed ? "0.6rem" : "1.2rem"};
      `}
    >
      {/* ---------- 홈 ---------- */}
      {isCollapsed ? <CollapsedHomeButton /> : <HomeButton />}

      {/* ---------- 내 스페이스 ---------- */}
      <section
        css={css`
          margin-top: ${isCollapsed ? 0 : "0.8rem"};
        `}
      >
        {isCollapsed ? <CollapsedHeaderSpaceAddButton /> : <HeaderSpaceAddButton />}

        {/* ---------- 탭 (전체 / 개인 / 팀) - 축소시 숨김 ---------- */}
        {!isCollapsed && <SpaceTabs currentTab={currentTab} handleCurrentTabClick={handleCurrentTabClick} />}

        {/* ---------- 스페이스 리스트 ---------- */}
        <SpacesList isCollapsed={isCollapsed} />
      </section>
    </nav>
  );
}
