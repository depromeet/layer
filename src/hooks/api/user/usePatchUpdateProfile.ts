import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useAtom } from "jotai";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";
import { authAtom } from "@/store/auth/authAtom";

type JoinSpaceParams = {
  name: string;
  profileImageUrl: string;
};

export const usePatchUpdateProfile = (): UseMutationResult<AxiosResponse, unknown, JoinSpaceParams> => {
  const { toast } = useToast();
  const [, setAuthState] = useAtom(authAtom);

  const updateProfile = async ({ name, profileImageUrl }: JoinSpaceParams): Promise<AxiosResponse> => {
    const res = await api.patch(`/api/member/update-profile`, {
      name: name,
      profileImageUrl: profileImageUrl,
    });
    return res;
  };

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (_data, variables) => {
      toast.success("수정이 완료되었습니다.");
      setAuthState((prev) => ({
        ...prev,
        name: variables.name,
        imageUrl: variables.profileImageUrl,
      }));
    },
    onError: (error) => {
      console.error(error);
      toast.error("서버 에러가 발생했어요!");
    },
  });
};
