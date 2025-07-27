import { css } from "@emotion/react";

import HomeButton from "./HomeButton";
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
        padding: 1.2rem;
      `}
    >
      {/* ---------- 홈 ---------- */}
      <HomeButton isCollapsed={isCollapsed} />

      {/* ---------- 내 스페이스 ---------- */}
      <section
        css={css`
          margin-top: 0.8rem;
        `}
      >
        <HeaderSpaceAddButton />

        {/* ---------- 탭 (전체 / 개인 / 팀) ---------- */}
        <SpaceTabs currentTab={currentTab} handleCurrentTabClick={handleCurrentTabClick} />

        {/* ---------- 스페이스 리스트 ---------- */}
        <SpacesList />
      </section>
    </nav>
  );
}
