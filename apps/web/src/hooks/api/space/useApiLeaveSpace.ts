import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";
import { PATHS } from "@layer/shared";

export const useApiLeaveSpace = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const apiSpaceLeave = async (spaceId: string | undefined) => {
    const response = await api.post(`/api/space/leave`, { spaceId: Number(spaceId) });
    return response;
  };

  return useMutation({
    mutationFn: (spaceId: string) => apiSpaceLeave(spaceId),
    onSuccess: () => {
      navigate(PATHS.home());
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
      toast.success("스페이스를 성공적으로 떠났습니다.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
