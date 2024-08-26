import { ButtonProvider } from "@/component/common/button";
import { Spacing } from "@/component/common/Spacing";
import { SocialLoginButton } from "@/component/login";
import { LoginCarousel } from "@/component/login/LoginCarousel";
import { usePostAppleLogin } from "@/hooks/api/login/usePostAppleToken";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function LoginPage() {
  const { mutate: postAppleLogin } = usePostAppleLogin();

  window.AppleID.auth.init({
    clientId: `${import.meta.env.VITE_APPLE_CLIENT_ID}`,
    scope: "email",
    redirectURI: `${import.meta.env.VITE_APPLE_REDIRECT_URI}`,
    state: `${import.meta.env.VITE_APPLE_STATE}`,
    nonce: `${import.meta.env.VITE_APPLE_NONCE}`,
    usePopup: true,
  });

  const kakaoLogin = () => {
    const REST_API_KEY = import.meta.env.VITE_REST_API_KEY as string;
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;
    const link = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = link;
  };

  const appleLogin = async () => {
    try {
      const {
        authorization: { code, id_token, state },
      } = await window.AppleID.auth.signIn();
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
