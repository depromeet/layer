import { css, Interpolation, Theme } from "@emotion/react";
import Cookies from "js-cookie";
import { HTMLAttributes, useEffect } from "react";

import { ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { SocialLoginButton } from "@/component/login/SocialLoginButton.tsx";
import { usePostAppleLogin } from "@/hooks/api/login/usePostAppleToken.ts";
import { backgroundColors } from "@/types/loginType";
import { isMobile } from "@/utils/etc";

export function SocialLoginArea({
  onlyContainerStyle,
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, "type"> & { onlyContainerStyle?: Interpolation<Theme> }) {
  const { mutate: postAppleLogin, isPending } = usePostAppleLogin();

  window.AppleID.auth.init({
    clientId: `${import.meta.env.VITE_APPLE_CLIENT_ID}`,
    scope: "email",
    redirectURI: `${import.meta.env.VITE_APPLE_REDIRECT_URI}`,
    state: `${import.meta.env.VITE_APPLE_STATE}`,
    nonce: `${import.meta.env.VITE_APPLE_NONCE}`,
    usePopup: true,
  });

  useEffect(() => {
    if (typeof window.Kakao !== "undefined" && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAKO_JAVASCRIPT_KEY);
    }
  }, []);

  const kakaoLoginRedirection = () => {
    const REST_API_KEY = import.meta.env.VITE_REST_API_KEY as string;
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;
    const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = link;
  };

  // 카카오 로그인 함수
  const kakaoLogin = () => {
    const KAKAO_REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;

    if (window.Kakao) {
      if (isMobile()) {
        window.Kakao.Auth.authorize({
          redirectUri: KAKAO_REDIRECT_URI,
          fail: () => {
            kakaoLoginRedirection();
          },
          throughTalk: true,
        });
      } else {
        kakaoLoginRedirection();
      }
    }
  };

  const appleLogin = async () => {
    try {
      const {
        authorization: { code, id_token, state },
      } = await window.AppleID.auth.signIn();
      Cookies.set("appleAccessToken", id_token);
      postAppleLogin({ code, id_token, state });
    } catch (error) {
      console.error("apple login error:", error);
    }
  };

  const googleLogin = () => {
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID as string;
    const REDIRECT_URI = import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI as string;
    const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email+profile`;
    window.location.href = link;
  };

  return (
    <div {...props}>
      <ButtonProvider onlyContainerStyle={onlyContainerStyle} isProgress={isPending}>
        <SocialLoginButton type="kakao" handler={kakaoLogin} />
        {/* <SocialLoginButton type="apple" handler={appleLogin} /> */}

        <button
          css={css`
            width: 100%;
            height: 4.8rem;
            border-radius: 0.8rem;
            background-color: ${backgroundColors["apple"]};
            text-align: center;
            position: relative;
          `}
          onClick={appleLogin}
        >
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
          <Typography variant="subtitle14SemiBold">Apple 로그인</Typography>
        </button>
        <SocialLoginButton type="google" handler={googleLogin} />
      </ButtonProvider>
    </div>
  );
}
