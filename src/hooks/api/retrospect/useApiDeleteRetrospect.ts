import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";

export const useApiDeleteRetrospect = () => {
  const { toast } = useToast();

  const retrospectDelete = async (spaceId: string | undefined, retrospectId: string | undefined) => {
    const response = await api.delete(`/space/${spaceId}/retrospect/${retrospectId}`);
    return response;
  };

  return useMutation({
    mutationFn: ({ spaceId, retrospectId }: { spaceId: string | undefined; retrospectId: string | undefined }) =>
      retrospectDelete(spaceId, retrospectId),
    onSuccess: () => {
      toast.success("회고록 삭제에 성공하였습니다.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
