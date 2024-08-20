import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";

export const useApiDeleteSpace = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const apiSpaceDelete = async (spaceId: string | undefined) => {
    const response = await api.delete(`/api/space/${spaceId}`);
    return response;
  };

  return useMutation({
    mutationFn: (spaceId: string) => apiSpaceDelete(spaceId),
    onSuccess: () => {
      navigate("/");
      toast.success("스페이스 삭제가 완료되었습니다.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
