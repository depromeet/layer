import { ButtonProvider } from "@/component/common/button";
import { Spacing } from "@/component/common/Spacing";
import { SocialLoginButton } from "@/component/login";
import { LoginCarousel } from "@/component/login/LoginCarousel";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function LoginPage() {
  return (
    <DefaultLayout appBarVisible={false}>
      <Spacing size={6} />
      <LoginCarousel />
      <ButtonProvider>
        <SocialLoginButton type="kakao" handler={kakaoLogin} />
        <SocialLoginButton type="apple" handler={appleLogin} />
        <SocialLoginButton type="google" handler={googleLogin} />
      </ButtonProvider>
    </DefaultLayout>
  );
}

const kakaoLogin = () => {
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY as string;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;
  const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  window.location.href = link;
};

const appleLogin = async () => {
  window.AppleID.auth.init({
    clientId: `${import.meta.env.VITE_APPLE_CLIENT_ID}`,
    scope: "email",
    //FIXME - temp redirect uri
    redirectURI: "https://somehow-annual-crowd-interact.trycloudflare.com/api/v1/auth/test",
    state: `${import.meta.env.VITE_APPLE_STATE}`,
    nonce: `${import.meta.env.VITE_APPLE_NONCE}`,
    usePopup: false,
  });

  try {
    sessionStorage.setItem("redirect_uri", "/");
    const res = await window.AppleID.auth.signIn();
    console.log("res", res.authorization, res.user);
  } catch (error) {
    console.log("error", error);
  }
};

const googleLogin = () => {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID as string;
  const REDIRECT_URI = import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI as string;
  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email+profile`;
  window.location.href = link;
};
