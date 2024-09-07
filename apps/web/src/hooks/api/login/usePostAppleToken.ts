import { Path, PATHS } from "@layer/shared";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import Cookies from "js-cookie";

import { api } from "@/api";
import { COOKIE_VALUE_SAVE_SPACE_ID_PHASE } from "@/app/space/space.const.ts";
import { COOKIE_KEYS } from "@/config/storage-keys";
import { useApiJoinSpace } from "@/hooks/api/space/useApiJoinSpace.ts";
import { useToast } from "@/hooks/useToast";
import { useTestNatigate } from "@/lib/test-natigate";
import { authAtom } from "@/store/auth/authAtom";
import { AuthResponse } from "@/types/loginType";

//FIXME -공통 에러 처리하기 (usePostSignIn)
type ErrorType = {
  status: number;
  message: string;
};

type PostAppleLoginReq = {
  code: string;
  id_token: string;
  state: string;
};

export const usePostAppleLogin = () => {
  const postAppleLogin = async ({ code, id_token, state }: PostAppleLoginReq) => {
    const searchParams = {
      code,
      id_token,
      state,
    };

    const res = await api.post<AuthResponse>(`/api/auth/oauth2/apple`, new URLSearchParams(searchParams), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data;
  };

  const { toast } = useToast();
  const navigate = useTestNatigate();
  const setAuth = useSetAtom(authAtom);
  const { mutate } = useApiJoinSpace();

  return useMutation({
    mutationFn: postAppleLogin,
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
        navigate(prevPath as Path);
        return;
      }

      const saveSpaceIdPhase = Cookies.get(COOKIE_VALUE_SAVE_SPACE_ID_PHASE);
      if (saveSpaceIdPhase) {
        const moveNextPhase = () => {
          navigate(PATHS.spaceDetail(saveSpaceIdPhase));
          Cookies.remove(COOKIE_VALUE_SAVE_SPACE_ID_PHASE);
        };

        mutate(parseInt(saveSpaceIdPhase), {
          onSuccess: () => {
            toast.success("스페이스에 초대되었어요!");
            moveNextPhase();
          },
          onError: (error) => {
            if (error.status === 400) {
              toast.success("이미 참여한 스페이스로 이동했어요!");
              moveNextPhase();
            }
          },
        });
      } else {
        toast.success("어서오세요!");
        navigate(PATHS.home());
      }

      return;
    },
    onError: (error: ErrorType) => {
      if (error.status === 400) {
        toast.success("닉네임을 입력하여 회원가입을 진행해보세요.");
        navigate(PATHS.setNickName("apple"));
      } else {
        toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate(PATHS.login());
      }
    },
  });
};
