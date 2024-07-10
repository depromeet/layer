import { DefaultLayout } from "@/layout/DefaultLayout";
import SocialLoginButton from "@/component/button/SocialLoginButton";
import { kakaoLogin } from "./kakao/kakaoLogin";
import { googleLogin } from "./google/googleLogin";

const Login = () => {
  return (
    <DefaultLayout title="떡잎마을 방법대" RightComp={<>Right Comp</>}>
      <SocialLoginButton type="kakao" handler={kakaoLogin} />
      <SocialLoginButton type="google" handler={googleLogin} />
    </DefaultLayout>
  );
};
export default Login;
