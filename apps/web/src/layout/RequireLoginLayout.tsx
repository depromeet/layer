import { PATHS } from "@layer/shared";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { Fragment, ReactNode, useCallback, useEffect, useState } from "react";

import { fetchMemberInfo } from "@/api/login";
import { clearAuthCookies, refreshAccessToken } from "@/api/token";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { COOKIE_KEYS } from "@/config/storage-keys";
import { onAuthExpired } from "@/lib/auth-event";
import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import { useTestNatigate } from "@/lib/test-natigate";
import { authAtom } from "@/store/auth/authAtom";

type RequireLoginProps = {
  children: ReactNode;
};

export function RequireLoginLayout({ children }: RequireLoginProps) {
  const [auth, setAuth] = useAtom(authAtom);
  // auth.isLogin=true + accessToken 있으면 즉시 통과 (복원 불필요)
  // 그 외에는 복원 중 LoadingModal 표시하여 children API 호출 차단
  const [isRestoring, setIsRestoring] = useState(
    () => !auth.isLogin || !Cookies.get(COOKIE_KEYS.accessToken),
  );
  const navigate = useTestNatigate();
  const queryClient = useQueryClient();
  const curPath = window.location.pathname;
  const { setPeople } = useMixpanel();

  const redirectLogin = useCallback(() => {
    Cookies.set(COOKIE_KEYS.redirectPrevPathKey, curPath);
    void navigate(PATHS.login(), { replace: true });
  }, [curPath, navigate]);

  // auth 만료 이벤트 리스너 등록
  useEffect(() => {
    const unsubscribe = onAuthExpired(() => {
      queryClient.clear();
      setAuth({ isLogin: false, name: "", email: "", memberRole: "", imageUrl: "" });
      redirectLogin();
    });
    return unsubscribe;
  }, [queryClient, setAuth, redirectLogin]);

  // 마운트 시 인증 상태 복원
  useEffect(() => {
    const restore = async () => {
      const accessToken = Cookies.get(COOKIE_KEYS.accessToken);
      const refreshToken = Cookies.get(COOKIE_KEYS.refreshToken);

      // Case 1: 이미 로그인 + accessToken 유효
      if (auth.isLogin && accessToken) {
        setIsRestoring(false);
        return;
      }

      // Case 2: 토큰 없음 → 로그인 페이지
      if (!accessToken && !refreshToken) {
        redirectLogin();
        return;
      }

      try {
        if (!accessToken && refreshToken) {
          // Case 3: accessToken 없음 + refreshToken 있음 → 무음 갱신
          const data = await refreshAccessToken();
          if (!data) throw new Error("No data from refreshAccessToken");
          setAuth({
            isLogin: true,
            name: data.name,
            email: data.email,
            memberRole: data.memberRole,
            imageUrl: data.imageUrl,
          });
          setPeople(data.memberId.toString());
          setIsRestoring(false);
          return;
        }

        // Case 4: accessToken 있지만 isLogin=false (앱 재시작 등)
        const response = await fetchMemberInfo();
        setAuth({
          isLogin: true,
          name: response.name,
          email: response.email,
          memberRole: response.memberRole,
          imageUrl: response.imageUrl,
        });
        setPeople(response.memberId.toString());
        setIsRestoring(false);
      } catch {
        clearAuthCookies();
        redirectLogin();
      }
    };

    restore().catch(() => {
      clearAuthCookies();
      redirectLogin();
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 복원 중 LoadingModal 표시 (children API 호출 차단 + 빈 화면 깜빡임 방지)
  if (isRestoring) {
    return <LoadingModal />;
  }

  if (!auth.isLogin) return null;

  return <Fragment>{children}</Fragment>;
}
