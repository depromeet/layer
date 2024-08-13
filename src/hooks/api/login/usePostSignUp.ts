import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { PATHS } from "@/config/paths";
import { useToast } from "@/hooks/useToast";
import { authAtom } from "@/store/auth/authAtom";
import { AuthResponse, SocialLoginKind } from "@/types/loginType";

type PostSignUp = {
  accessToken: string;
  name: string;
  socialType: SocialLoginKind | undefined;
};

export const usePostSignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [, setAuth] = useAtom(authAtom);
  const signUpWithToken = async ({ accessToken, name, socialType }: PostSignUp): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      "/api/auth/sign-up",
      {
        socialType: socialType?.toUpperCase(),
        name: name,
      },
      {
        headers: {
          "X-Auth-Token": accessToken,
        },
      },
    );
    return response.data;
  };

  return useMutation<AuthResponse, unknown, PostSignUp>({
    mutationFn: signUpWithToken,
    onSuccess: (data: AuthResponse) => {
      if (data) {
        Cookies.set("memberId", data.memberId.toString(), { expires: 7 });
        Cookies.set("accessToken", data.accessToken, { expires: 7 });
        Cookies.set("refreshToken", data.refreshToken, { expires: 7 });
        setAuth({ isLogin: true, name: data.name, email: data.email, memberRole: data.memberRole, imageUrl: data.imageUrl });
      }
      toast.success("Layer에 온걸 환영해요!");
      navigate(PATHS.home());
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
      toast.error("회원가입이 실패했습니다.");
    },
  });
};
