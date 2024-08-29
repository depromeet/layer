import { SocialLoginArea } from "@/component/login";
import { LoginCarousel } from "@/component/login/LoginCarousel";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function LoginPage() {
  return (
    <DefaultLayout appBarVisible={false}>
      <LoginCarousel />
      <SocialLoginArea />
    </DefaultLayout>
  );
}
