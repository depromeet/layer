import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { loginKakao } from "@/api/login";
import { LoginKakaoResult } from "@/types/loginType";

export function KaKaoRedirection() {
  const code = new URL(window.location.toString()).searchParams.get("code");
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery<LoginKakaoResult, Error>({
    queryKey: ["auth", "kakao"],
    queryFn: () => loginKakao(code),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchInterval: false,
  });

  // 데이터 변화 감지 및 성공/실패 처리
  useEffect(() => {
    if (data) {
      const { status, response } = data;
      if (status === "loginSuccess" && response) {
        Cookies.set("memberId", response.memberId.toString(), { expires: 7 });
        Cookies.set("accessToken", response.accessToken, { expires: 7 });
        Cookies.set("refreshToken", response.refreshToken, { expires: 7 });
        navigate("/home/retrospect");
      } else if (status === "signupSuccess") {
        navigate("/makeSpace");
      } else {
        navigate("/login");
      }
    }
  }, [data, navigate]);

  if (isLoading) {
    return <div>로그인 중입니다...</div>;
  }

  if (isError) {
    return <div>로그인 중 에러가 발생했습니다.</div>;
  }

  // FIXME: 로그인 로딩 디자인 필요 및 이에 따른 코드 추가 개발 필요
  return <div>로그인 중입니다.</div>;
}
