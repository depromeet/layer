import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

import LocalNavigationBar from "@/component/common/LocalNavigationBar";

export default function DesktopHomeLayout() {
  return (
    <main>
      <LocalNavigationBar />
      <section
        css={css`
          margin-left: calc(26rem + 2.4rem);
        `}
      >
        <Outlet />
      </section>
    </main>
  );
}
