import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { COOKIE_VALUE_SAVE_SPACE_ID_PHASE } from "@/app/space/space.const.ts";
import { PATHS } from "@/config/paths";
import { useApiJoinSpace } from "@/hooks/api/space/useApiJoinSpace.ts";
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
  const { mutate } = useApiJoinSpace();
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

      const saveSpaceIdPhase = Cookies.get(COOKIE_VALUE_SAVE_SPACE_ID_PHASE);
      if (saveSpaceIdPhase) {
        mutate(parseInt(saveSpaceIdPhase), {
          onSuccess: () => {
            toast.success("첫 스페이스에 오신 걸 환영해요!");
            navigate(PATHS.spaceDetail(saveSpaceIdPhase));
            Cookies.remove(COOKIE_VALUE_SAVE_SPACE_ID_PHASE);
          },
        });
      } else {
        toast.success("Layer에 오신 걸 환영해요!");
        navigate(PATHS.home());
      }
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
      toast.error("회원가입이 실패했습니다.");
    },
  });
};
