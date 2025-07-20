import { css } from "@emotion/react";
import { useState } from "react";

import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation/Navigation";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export const SPACE_TABS = ["전체", "개인", "팀"] as const;

export default function LocalNavigationBar() {
  const [currentTab, setCurrentTab] = useState<"전체" | "개인" | "팀">("전체");

  const handleCurrentTabClick = (tab: (typeof SPACE_TABS)[number]) => {
    setCurrentTab(tab);
  };

  return (
    <aside
      css={css`
        position: fixed;
        top: 1.2rem;
        left: 1.2rem;
        width: 26rem;
        height: calc(100vh - 2.4rem);
        background-color: ${DESIGN_TOKEN_COLOR.gray00};
        display: flex;
        flex-direction: column;
        z-index: 1000;
        border-radius: 1.2rem;
      `}
    >
      <Header />

      <Navigation currentTab={currentTab} handleCurrentTabClick={handleCurrentTabClick} />

      <Footer />
    </aside>
  );
}
