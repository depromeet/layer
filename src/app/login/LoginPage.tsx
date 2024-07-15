import { SocialLoginButton } from "@/component/login/socialLoginButton";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function LoginPage() {
  return (
    <DefaultLayout appBarVisible={false}>
      <SocialLoginButton type="kakao" handler={kakaoLogin} />
      <SocialLoginButton type="google" handler={googleLogin} />
    </DefaultLayout>
  );
}

function kakaoLogin() {
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY as string;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = link;
}

function googleLogin() {
  console.log("구글 로그인 시도");
}
