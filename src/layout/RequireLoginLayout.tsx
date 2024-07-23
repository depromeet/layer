import { useAtom } from "jotai";
import { Fragment, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { authAtom } from "@/store/auth/authAtom";
import { fetchMemberInfo } from "@/api/login";
import { MemberInfo } from "@/types/loginType";

type RequireLoginProps = {
  children: ReactNode;
};

export function RequireLoginLayout({ children }: RequireLoginProps) {
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (auth.isLogin) return;

      const accessToken = Cookies.get("accessToken");
      console.log(accessToken);
      if (accessToken) {
        try {
          const response = await fetchMemberInfo(accessToken);
          setAuth({ isLogin: true, name: response.name, email: response.email, memberRole: response.memberRole });
        } catch (error) {
          console.error("Error fetching member info:", error);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    // 비동기 함수를 즉시 호출하고 반환된 Promise를 처리합니다.
    checkLoginStatus().catch((error) => {
      console.error("유저 정보 불러오기 실패:", error);
    });
  }, [auth, setAuth, navigate]);

  if (!auth.isLogin) return null;

  return <Fragment>{children}</Fragment>;
}
