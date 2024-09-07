import { css } from "@emotion/react";
import Lottie from "lottie-react";
import { useEffect } from "react";

import loading from "@/assets/lottie/modal/loading/loading.json";
import { Portal } from "@/component/common/Portal";
import { useBridge } from "@/lib/provider/bridge-provider";
import { ANIMATION } from "@/style/common/animation.ts";

type LoadingModalProps = {
  purpose?: string;
};

export function LoadingModal({ purpose = "데이터를 가져오고 있어요" }: LoadingModalProps) {
  const { bridge, isWebView } = useBridge();

  useEffect(() => {
    // async function callNativeSuspense(loading: boolean) {

    //   try {
    //     await bridge.setSuspenseState({ loading, message: purpose });
    //   } catch (error) {
    //     console.error("Error calling native suspense:", error);
    //   }
    //   // if (bridge) {
    //   // }
    // }

    // callNativeSuspense(true).catch(console.error);
    // return () => {
    //   callNativeSuspense(false).catch(console.error);
    // };

    window.ReactNativeWebView?.postMessage(JSON.stringify({ type: "LOADING", data: true }));
    return () => {
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: "LOADING", data: false }));
    };
  }, [bridge, purpose]);
  return !isWebView ? (
    <Portal id={"loading-modal-root"}>
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          transition: 0.4s all;
          backdrop-filter: blur(2rem);
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999;
          animation: ${ANIMATION.FADE_IN} 0.6s ease-in-out;
        `}
      >
        <div
          css={css`
            height: fit-content;
            //background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 3rem;
            max-width: 30rem;
            border-radius: 1.2rem;
            row-gap: 1rem;
            animation: ${ANIMATION.ZOOM_IN} 0.4s ease-in-out;
          `}
        >
          <Lottie
            animationData={loading}
            loop={true}
            css={css`
              height: auto;
              width: 40%;
            `}
          />
          <span
            css={css`
              position: relative;
              color: white;
              font-size: 1.4rem;
              text-align: center;
              line-height: 1.5;
              letter-spacing: -0.03rem;
            `}
          >
            {purpose}
          </span>
        </div>
      </div>
    </Portal>
  ) : (
    <></>
  );
}
