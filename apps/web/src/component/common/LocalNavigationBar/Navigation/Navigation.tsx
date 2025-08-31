import { css } from "@emotion/react";

import HomeButton from "./HomeButton";
import HeaderSpaceAddButton from "./space/HeaderSpaceAddButton";
import SpacesList from "./space/SpacesList";
import SpaceTabs from "./space/SpaceTabs";
import { useState } from "react";
import { PROJECT_CATEGORY_MAP } from "../constants";
import { useNavigation } from "../context/NavigationContext";

export default function Navigation() {
  const { isCollapsed } = useNavigation();

  // TODO(prgmr99): 현재 탭을 기준으로 스페이스 리스트 불러오기
  const [currentTab, setCurrentTab] = useState<"전체" | "개인" | "팀">("전체");

  const handleCurrentTabClick = (tab: keyof typeof PROJECT_CATEGORY_MAP) => {
    setCurrentTab(tab);
  };

  return (
    <nav
      css={css`
        flex: 1;
        overflow-y: auto;
        padding: ${isCollapsed ? "0.6rem" : "1.2rem"};
      `}
    >
      {/* ---------- 홈 ---------- */}
      <HomeButton />

      {/* ---------- 내 스페이스 ---------- */}
      <section
        css={css`
          margin-top: ${isCollapsed ? 0 : "0.8rem"};
        `}
      >
        {/* ---------- 스페이스 추가 버튼 ---------- */}
        <HeaderSpaceAddButton />

        {/* ---------- 탭 (전체 / 개인 / 팀) ---------- */}
        <SpaceTabs currentTab={currentTab} handleCurrentTabClick={handleCurrentTabClick} />

        {/* ---------- 스페이스 리스트 ---------- */}
        <SpacesList currentTab={currentTab} />
      </section>
    </nav>
  );
}
