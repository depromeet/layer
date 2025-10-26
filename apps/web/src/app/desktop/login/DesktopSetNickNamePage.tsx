// NOTE: 다른 래핑 플로우는 어떻게 되는지 확인 후, 공통 래핑 컴포넌트 개발 필요
import { SetNickName } from "@/app/mobile/login/SetNicknamePage";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { css } from "@emotion/react";

export default function DesktopSetNickNamePage() {
  return (
    <main
      css={css`
        width: 100dvw;
        height: 100dvh;
        background-color: ${DESIGN_TOKEN_COLOR.gray100};
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <section
        css={css`
          height: 100%;
          border-radius: 2rem;
          overflow: hidden;
          box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
          width: 48rem;
          height: 63.4rem;
        `}
      >
        <div
          css={css`
            width: 100%;
            height: 100%;
            background-color: white;
            padding-top: 4.8rem;
            padding-inline: 3.2rem;
            padding-bottom: 0.8rem;
            position: relative;
            display: flex;
            flex-direction: column;
          `}
        >
          <SetNickName />
        </div>
      </section>
    </main>
  );
}
