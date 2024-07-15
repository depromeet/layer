import { css } from "@emotion/react";

import { LoginSpriteSvg } from "@/component/login/loginSpriteSvg";
import { loginTypeProvider, loginBtnProps, backgroundColors } from "@/types/loginType";

export function SocialLoginButton({ type, handler }: loginBtnProps) {
  return (
    <button
      css={css`
        width: 100%;
        height: 4.8rem;
        border-radius: 0.8rem;
        background-color: ${backgroundColors[type]};
        text-align: center;
        position: relative;
        border: ${type === "google" ? "0.01rem solid rgba(0, 0, 0, 0.08)" : "none"};
      `}
      onClick={() => {
        handler();
      }}
    >
      <div
        css={css`
          position: absolute;
          left: 1.6rem;
          top: 50%;
          transform: translateY(-50%);
        `}
      >
        <LoginSpriteSvg type={type} />
      </div>
      {loginTypeProvider[type]}로 로그인
    </button>
  );
}
