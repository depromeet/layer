import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { loginKakao } from "@/api/login";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { authAtom } from "@/store/auth/authAtom";
import { LoginKakaoResult, AuthResponse } from "@/types/loginType";

export function KaKaoRedirection() {
  const code = new URL(window.location.toString()).searchParams.get("code");
  const navigate = useNavigate();
  const [, setAuth] = useAtom(authAtom);

  function setAuthResponse(response: AuthResponse) {
    if (response) {
      Cookies.set("memberId", response.memberId.toString(), { expires: 7 });
      Cookies.set("accessToken", response.accessToken, { expires: 7 });
      Cookies.set("refreshToken", response.refreshToken, { expires: 7 });
      setAuth({ isLogin: true, name: response.name, email: response.email, memberRole: response.memberRole });
    }
  }

  const { isLoading, isError, data } = useQuery<LoginKakaoResult, Error>({
    queryKey: ["auth", "kakao"],
    queryFn: () => loginKakao(code),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchInterval: false,
  });

  useEffect(() => {
    if (data) {
      const { status, response } = data;
      if (status === 200) {
        setAuthResponse(response);
        navigate("/");
      } else if (status === 400) {
        navigate("/setnickname");
      } else {
        navigate("/login");
      }
    }
  }, [data, navigate]);

  if (isLoading) {
    return (
      <div>
        <LoadingModal />
      </div>
    );
  }

  if (isError) {
    return <div>로그인 중 에러가 발생했습니다.</div>;
  }

  return (
    <div>
      <LoadingModal />
    </div>
  );
}
