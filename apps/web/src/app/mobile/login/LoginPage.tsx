import { useEffect } from "react";
import Cookies from "js-cookie";
import { PATHS } from "@layer/shared";
import { useTestNavigate } from "@/lib/test-natigate";
import { COOKIE_KEYS } from "@/config/storage-keys";
import { SocialLoginArea } from "@/component/login";
import { LoginCarousel } from "@/component/login/LoginCarousel";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function LoginPage() {
  const navigate = useTestNavigate();

  useEffect(() => {
    const accessToken = Cookies.get(COOKIE_KEYS.accessToken);
    const refreshToken = Cookies.get(COOKIE_KEYS.refreshToken);
    if (accessToken || refreshToken) {
      void navigate(PATHS.home(), { replace: true });
    }
  }, [navigate]);

  return (
    <DefaultLayout appBarVisible={false}>
      <LoginCarousel />
      <SocialLoginArea />
    </DefaultLayout>
  );
}
