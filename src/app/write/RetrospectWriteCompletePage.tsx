import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import temp from "@/assets/temp.gif";
import { Confetti } from "@/component/common/Confetti";
import { HeaderProvider } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { DefaultLayout } from "@/layout/DefaultLayout.tsx";
import { ANIMATION } from "@/style/common/animation.ts";

export function RetrospectWriteCompletePage() {
  const navigate = useNavigate();
  return (
    <DefaultLayout LeftComp={<Icon icon={"ic_write_quit"} size={1.4} onClick={() => navigate("/home")} />}>
      <HeaderProvider>
        {/*  FIXME: 추후 API 연동 후 닉네임 값이 들어와야해요 */}
        <HeaderProvider.Subject contents={`디프만님의\n회고 작성이 완료되었어요!`} />
      </HeaderProvider>
      <div
        css={css`
          padding-top: 2.2rem;
        `}
      >
        <img
          src={temp}
          css={css`
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: auto;
            animation: ${ANIMATION.FADE_IN} 0.8s ease-in-out;
          `}
        />
        <Confetti />
      </div>
    </DefaultLayout>
  );
}
