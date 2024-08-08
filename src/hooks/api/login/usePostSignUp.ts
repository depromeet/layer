import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { PATHS } from "@/config/paths";
import { useToast } from "@/hooks/useToast";
import { AuthResponse, SocialLoginKind } from "@/types/loginType";

type PostSignUp = {
  accessToken: string;
  name: string;
  socialType: SocialLoginKind | undefined;
};

export const usePostSignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    onSuccess: () => {
      toast.success("Layer에 온걸 환영해요!");
      navigate(PATHS.home());
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
      toast.error("회원가입이 실패했습니다.");
    },
  });
};
