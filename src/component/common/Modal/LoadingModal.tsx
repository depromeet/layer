import { css } from "@emotion/react";
import Lottie from "lottie-react";

import loading from "@/assets/lottie/modal/loading/loading.json";
import { Portal } from "@/component/common/Portal";
import { ANIMATION } from "@/style/common/animation.ts";

type LoadingModalProps = {
  purpose?: string;
};

export function LoadingModal({ purpose = "데이터를 가져오고 있어요" }: LoadingModalProps) {
  return (
    <Portal id={"modal-root"}>
      <div
        css={css`
          position: absolute;
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
          z-index: 10001;
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
  );
}
