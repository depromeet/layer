import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { PATHS } from "@/config/paths";
import { COOKIE_KEYS } from "@/config/storage-keys";
import { useToast } from "@/hooks/useToast";
import { authAtom } from "@/store/auth/authAtom";
import { LoginKindType, AuthResponse } from "@/types/loginType";

type ErrorType = {
  status: number;
  message: string;
};

export const usePostSignIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [, setAuth] = useAtom(authAtom);

  const signInWithToken = async ({ socialType }: LoginKindType): Promise<AuthResponse> => {
    const tokenKey = `${socialType}AccessToken`;
    const response = await api.post<AuthResponse>(
      "/api/auth/sign-in",
      {
        socialType: socialType.toUpperCase(),
      },
      {
        headers: {
          "X-Auth-Token": Cookies.get(tokenKey),
        },
      },
    );
    return response.data;
  };

  return useMutation<AuthResponse, ErrorType, LoginKindType>({
    mutationFn: signInWithToken,
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
    onError: (error: ErrorType, variables: LoginKindType) => {
      if (error.status === 400) {
        toast.success("닉네임을 입력하여 회원가입을 진행해보세요.");
        navigate(PATHS.setNickName(variables.socialType));
      } else {
        toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate(PATHS.login());
      }
    },
  });
};
