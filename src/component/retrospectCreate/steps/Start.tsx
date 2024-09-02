import { css } from "@emotion/react";
import Lottie from "lottie-react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { RetrospectCreateContext } from "@/app/retrospectCreate/RetrospectCreate";
import retrospect_create_start_lottie from "@/assets/lottie/retropsect/create/speech_bubble_envelope.json";
import { ButtonProvider } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { trackEvent } from "@/lib/mixpanel/event";

export function Start() {
  const { spaceId } = useLocation().state as { spaceId: number; templateId: number; saveTemplateId?: boolean };
  const { goNext, confirmQuitPage } = useContext(RetrospectCreateContext);
  return (
    <>
      <Header title={"회고를 만들어볼까요"} contents={"회고를 진행할 질문들을 구성해요"} theme="white" />
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        `}
      >
        <Lottie animationData={retrospect_create_start_lottie} autoPlay={true} style={{ width: "34rem" }} />
      </div>
      <ButtonProvider>
        <ButtonProvider.White
          onClick={() => {
            goNext();
            trackEvent("Retrospect Create Start", {
              spaceId: `${spaceId}`,
            });
          }}
        >
          시작하기
        </ButtonProvider.White>
        <ButtonProvider.Primary onClick={confirmQuitPage}>나중에 하기</ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}
