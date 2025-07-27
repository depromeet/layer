import { css } from "@emotion/react";
import { useState } from "react";

import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation/Navigation";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { SPACE_TABS } from "./constants";

export default function LocalNavigationBar() {
  // TODO(prgmr99): 현재 탭을 기준으로 스페이스 리스트 불러오기
  const [currentTab, setCurrentTab] = useState<"전체" | "개인" | "팀">("전체");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCurrentTabClick = (tab: (typeof SPACE_TABS)[number]) => {
    setCurrentTab(tab);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <aside
      css={css`
        position: fixed;
        top: 1.2rem;
        left: 1.2rem;
        width: ${isCollapsed ? "6rem" : "26rem"};
        height: calc(100vh - 2.4rem);
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        display: flex;
        flex-direction: column;
        z-index: 1000;
        border-radius: 1.2rem;
        transition: width 0.3s ease-in-out;
      `}
    >
      <Header isCollapsed={isCollapsed} handleToggleCollapse={handleToggleCollapse} />

      <Navigation isCollapsed={isCollapsed} currentTab={currentTab} handleCurrentTabClick={handleCurrentTabClick} />

      <Footer isCollapsed={isCollapsed} />
    </aside>
  );
}
