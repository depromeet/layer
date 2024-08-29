import { css } from "@emotion/react";

import { LoginSpriteSvg } from "./LoginSpriteSvg";

import { Typography } from "@/component/common/typography";
import { backgroundColors, SocialLoginButtonProps } from "@/types/loginType";

export function SocialLoginButton({ type, handler }: SocialLoginButtonProps) {
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
      <Typography variant="subtitle14SemiBold">
        {type === "kakao" && "카카오로 로그인"}
        {type === "apple" && "Apple 로그인"}
        {type === "google" && "구글 계정으로 로그인"}
      </Typography>
    </button>
  );
}
