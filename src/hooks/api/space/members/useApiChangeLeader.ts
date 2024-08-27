import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";

type MembersResponse = {
  avatar: string | null;
  id: string;
  isLeader: boolean;
  name: string;
};

export const useChangeLeader = (spaceId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const changeLeader = async ({ spaceId, memberId }: { spaceId: string; memberId: string }) => {
    const res = await api.patch(`/api/space/change-leader`, {
      spaceId,
      memberId,
    });
    return res;
  };

  return useMutation({
    mutationFn: (changeValue: { spaceId: string; memberId: string }) => changeLeader(changeValue),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getMembers", spaceId],
      });
      toast.success("대표자가 변경되었습니다.");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
