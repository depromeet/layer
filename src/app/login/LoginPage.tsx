import { kakaoLogin } from "./kakao/kakaoLogin";
import { googleLogin } from "./google/googleLogin";
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
