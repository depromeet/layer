import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { PATHS } from "@/config/paths";
import { useToast } from "@/hooks/useToast";

export const useDeleteUser = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");

  const apiDeleteUser = async (memberId: string | undefined) => {
    const response = await api.post(`/api/auth/withdraw`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        memberId: memberId,
      },
    });
    return response;
  };

  return useMutation({
    mutationFn: (memberId: string) => apiDeleteUser(memberId),
    onSuccess: () => {
      toast.success("계정 탈퇴에 성공했어요");
      navigate(PATHS.login());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
