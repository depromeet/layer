import { css } from "@emotion/react";

import { LoginSpriteSvg } from "./LoginSpriteSvg";

import { Typography } from "@/component/common/typography";
import { backgroundColors, SocialLoginButtonProps } from "@/types/loginType";
import { Icon } from "../common/Icon";

export function SocialLoginButton({ type, handler }: SocialLoginButtonProps) {
  const isApple = type === "apple";
  const isGoogle = type === "google";
  const isKakao = type === "kakao";

  const renderSocialIcon = (() => {
    return isApple ? (
      <Icon
        icon="ic_apple_logo"
        size={6}
        css={css`
          position: absolute;
          left: -0.5rem;
          top: 50%;
          transform: translateY(-50%);
        `}
      />
    ) : (
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
    );
  })();

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
      {renderSocialIcon}
      <Typography variant="subtitle14SemiBold">
        {isKakao && "카카오 로그인"}
        {isApple && "애플 로그인"}
        {isGoogle && "구글 계정 로그인"}
      </Typography>
    </button>
  );
}
