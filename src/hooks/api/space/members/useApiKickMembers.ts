import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";

export const useApiKickMember = (spaceId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const apiKickMember = async ({ spaceId, memberId }: { spaceId: string; memberId: string }) => {
    const response = await api.patch(`/api/space/kick?spaceId=${spaceId}&memberId=${memberId}`);
    return response;
  };

  return useMutation({
    mutationFn: (deleteValue: { spaceId: string; memberId: string }) => apiKickMember(deleteValue),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMembers", spaceId],
      });
      toast.success("해당 팀원을 추방시켰습니다.");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
