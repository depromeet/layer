import { css } from "@emotion/react";
import Hotjar from "@hotjar/browser";
import { useAtom } from "jotai";
import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Modal } from "@/component/common/Modal";
import { useBridgeContext } from "@/lib/provider/bridge-provider";
import { themeAtom } from "@/store/theme.tsx";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens.ts";

const siteId = import.meta.env.VITE_HOTJAR_KEY as number;
const hotjarVersion = import.meta.env.VITE_HOTJAR_VERSION as number;

export default function GlobalLayout() {
  const { safeAreaHeight } = useBridgeContext();
  const [test, _] = useAtom(themeAtom);

  useEffect(() => {
    if (window.ReactNativeWebView && test) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ data: DESIGN_TOKEN_COLOR.themeBackground[test] }));
    }
  }, [test]);

  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion);
    if (import.meta.env.MODE === "production") {
      mixpanel.init(`${import.meta.env.VITE_MIXPANEL_TOKEN}`, {
        track_pageview: true,
      });
    } else {
      mixpanel.init(`${import.meta.env.VITE_MIXPANEL_TOKEN}`, {
        debug: true,
      });
    }
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
