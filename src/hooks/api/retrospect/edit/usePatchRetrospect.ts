import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";

type RetrospectEditReq = {
  title: string;
  introduction: string;
  deadline: string;
};

type PatchRetrospect = { spaceId: number; retrospectId: number; data: RetrospectEditReq };

export const usePatchRetrospect = (spaceId: string) => {
  const patchRetrospect = async ({ spaceId, retrospectId, data }: PatchRetrospect) => {
    const res = await api.patch(`/space/${spaceId}/retrospect/${retrospectId}`, data);
    return res;
  };

  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchRetrospect,
    onSuccess: async () => {
      toast.success("회고 정보가 수정되었어요!");
      await queryClient.invalidateQueries({
        queryKey: ["getRetrospects", spaceId], // FIXME - query key 상수화
      });
    },
  });
};
