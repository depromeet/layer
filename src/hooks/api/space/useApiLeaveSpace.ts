import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";

export const useApiLeaveSpace = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const apiSpaceLeave = async (spaceId: string | undefined) => {
    const response = await api.post(`/api/space/leave`, { spaceId: Number(spaceId) });
    return response;
  };

  return useMutation({
    mutationFn: (spaceId: string) => apiSpaceLeave(spaceId),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
