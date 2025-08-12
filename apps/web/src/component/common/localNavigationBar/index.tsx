import { css } from "@emotion/react";

import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation/Navigation";
import { NavigationProvider, useNavigation } from "./context/NavigationContext";

import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

function LocalNavigationBarContent() {
  const { isCollapsed } = useNavigation();

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
        will-change: width;
      `}
    >
      <Header />

      <Navigation />

      <Footer />
    </aside>
  );
}

export default function LocalNavigationBar() {
  return (
    <NavigationProvider>
      <LocalNavigationBarContent />
    </NavigationProvider>
  );
}
