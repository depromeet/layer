import { PATHS } from "@layer/shared";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Cookies from "js-cookie";

import { api } from "@/api";
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
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("memberId");
      setAuth({ isLogin: false, name: "", email: "", memberRole: "", imageUrl: "" }); // 상태 초기화
      navigate(PATHS.login(), { type: "REPLACE" });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
