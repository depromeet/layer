import { PATHS } from "@layer/shared";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { api } from "@/api";
import { clearAuthCookies } from "@/api/token";
import { useTestNatigate } from "@/lib/test-natigate";
import { authAtom } from "@/store/auth/authAtom";

export const usePostSignOut = () => {
  const navigate = useTestNatigate();
  const [, setAuth] = useAtom(authAtom);

  const signOutFun = async ({ memberId }: { memberId: string }) => {
    const response = await api.post("/api/auth/sign-out", {
      memberId: memberId,
    });
    return response;
  };

  return useMutation({
    mutationFn: signOutFun,
    onSuccess: () => {
      clearAuthCookies();
      setAuth({ isLogin: false, name: "", email: "", memberRole: "", imageUrl: "" }); // 상태 초기화
      void navigate(PATHS.login(), { type: "REPLACE" });
    },
    onError: (error) => {
      console.error(error);
      // API 실패해도 로컬 쿠키/상태 강제 정리
      clearAuthCookies();
      setAuth({ isLogin: false, name: "", email: "", memberRole: "", imageUrl: "" });
      void navigate(PATHS.login(), { type: "REPLACE" });
    },
  });
};
