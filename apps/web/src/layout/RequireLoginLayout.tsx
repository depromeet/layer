import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { Fragment, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchMemberInfo } from "@/api/login";
import { PATHS } from "@/config/paths";
import { COOKIE_KEYS } from "@/config/storage-keys";
import { authAtom } from "@/store/auth/authAtom";

type RequireLoginProps = {
  children: ReactNode;
};

export function RequireLoginLayout({ children }: RequireLoginProps) {
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();
  const curPath = window.location.pathname;

  const redirectLogin = () => {
    Cookies.set(COOKIE_KEYS.redirectPrevPathKey, curPath);
    navigate(PATHS.login());
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (auth.isLogin) return;

      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        try {
          const response = await fetchMemberInfo();
          setAuth({ isLogin: true, name: response.name, email: response.email, memberRole: response.memberRole, imageUrl: response.imageUrl });
        } catch (error) {
          console.error("Error fetching member info:", error);
          redirectLogin();
        }
      } else {
        redirectLogin();
      }
    };

    // 비동기 함수를 즉시 호출하고 반환된 Promise를 처리합니다.
    checkLoginStatus().catch((error) => {
      console.error("유저 정보 불러오기 실패:", error);
    });
  }, [auth, setAuth]);

  if (!auth.isLogin) return null;

  return <Fragment>{children}</Fragment>;
}
