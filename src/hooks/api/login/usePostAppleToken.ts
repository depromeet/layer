import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { PATHS } from "@/config/paths";
import { COOKIE_KEYS } from "@/config/storage-keys";
import { useToast } from "@/hooks/useToast";
import { authAtom } from "@/store/auth/authAtom";
import { AuthResponse } from "@/types/loginType";

export const usePostAppleLogin = () => {
  const postAppleLogin = async (code: string, id_token: string, state: string) => {
    const searchParams = {
      code,
      id_token,
      state,
    };

    const { data } = await axios.post<AuthResponse>(`/api/auth/oauth2/apple`, new URLSearchParams(searchParams), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return data;
  };

  const { toast } = useToast();
  const navigate = useNavigate();
  const setAuth = useSetAtom(authAtom);

  return useMutation({
    mutationFn: ({ code, id_token, state }: { code: string; id_token: string; state: string }) => postAppleLogin(code, id_token, state),
    onSuccess: (data: AuthResponse) => {
      if (data) {
        Cookies.set("memberId", data.memberId.toString(), { expires: 7 });
        Cookies.set("accessToken", data.accessToken, { expires: 7 });
        Cookies.set("refreshToken", data.refreshToken, { expires: 7 });
        setAuth({ isLogin: true, name: data.name, email: data.email, memberRole: data.memberRole, imageUrl: data.imageUrl });
      }

      const prevPath = Cookies.get(COOKIE_KEYS.redirectPrevPathKey);
      if (prevPath) {
        Cookies.remove(COOKIE_KEYS.redirectPrevPathKey);
        navigate(prevPath);
        return;
      }
      toast.success("어서오세요!");
      navigate(PATHS.home());
      return;
    },
  });
};
