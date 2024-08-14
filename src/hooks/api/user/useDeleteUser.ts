import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { PATHS } from "@/config/paths";
import { useToast } from "@/hooks/useToast";

export const useDeleteUser = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const apiSpaceLeave = async (memberId: string | undefined) => {
    const response = await api.post(`/api/auth/withdraw`, { memberId: memberId });
    return response;
  };

  return useMutation({
    mutationFn: (memberId: string) => apiSpaceLeave(memberId),
    onSuccess: () => {
      navigate(PATHS.login());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
