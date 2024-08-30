import { css } from "@emotion/react";
import Hotjar from "@hotjar/browser";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Modal } from "@/component/common/Modal";
import { useBridgeContext } from "@/lib/provider/bridge-provider";

// const siteId = import.meta.env.VITE_HOTJAR_KEY as number;
// const hotjarVersion = import.meta.env.VITE_HOTJAR_VERSION as number;

const siteId = 5117593;
const hotjarVersion = 6;

export default function GlobalLayout() {
  const { safeAreaHeight } = useBridgeContext();

  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion);
  }, []);

  return (
    <div
      css={css`
        width: 100vw;
        max-width: 48rem;
        min-height: 100dvh;
        box-shadow:
          0 0.1rem 0.3rem 0 rgb(0 0 0 / 0.1),
          0 0.1rem 0.2rem -0.1rem rgb(0 0 0 / 0.1);
        margin: 0 auto;

        box-sizing: border-box;

        display: flex;
        flex-direction: column;

        ${safeAreaHeight && { height: `calc(100dvh-${safeAreaHeight * 2}px)` }}
      `}
    >
      <Modal />
      <Outlet />
    </div>
  );
}
