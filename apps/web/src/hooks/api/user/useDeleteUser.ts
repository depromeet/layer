import { PATHS } from "@layer/shared";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import { api } from "@/api";
import { clearAuthCookies } from "@/api/token";
import { useToast } from "@/hooks/useToast";
import { useTestNavigate } from "@/lib/test-natigate";
import { authAtom } from "@/store/auth/authAtom";

export const useDeleteUser = () => {
  const { toast } = useToast();
  const navigate = useTestNavigate();
  const setAuth = useSetAtom(authAtom);

  const apiDeleteUser = async ({ memberId, booleans, description }: { memberId: string; booleans: boolean[]; description: string }) => {
    const response = await api.post(
      `/api/auth/withdraw`,
      {
        booleans: booleans,
        description: description,
      },
      {
        headers: {
          memberId: memberId,
        },
      },
    );
    return response;
  };

  return useMutation({
    mutationFn: ({ memberId, booleans, description }: { memberId: string; booleans: boolean[]; description: string }) =>
      apiDeleteUser({ memberId, booleans, description }),
    onSuccess: () => {
      clearAuthCookies();
      setAuth({ isLogin: false, name: "", email: "", memberRole: "", imageUrl: "", memberSeq: null });
      toast.success("계정 탈퇴에 성공했어요");
      void navigate(PATHS.login(), { type: "REPLACE" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
