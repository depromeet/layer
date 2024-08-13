import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { PATHS } from "@/config/paths";
import { authAtom } from "@/store/auth/authAtom";

export const usePostSignOut = () => {
  const navigate = useNavigate();
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
      navigate(PATHS.login());
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
