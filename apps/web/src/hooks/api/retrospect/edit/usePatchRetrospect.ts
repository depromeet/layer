import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";

type RetrospectEditReq = {
  title: string;
  introduction: string;
  deadline: string | null;
};

type PatchRetrospect = { spaceId: number; retrospectId: number; data: RetrospectEditReq };

export const usePatchRetrospect = () => {
  const patchRetrospect = async ({ spaceId, retrospectId, data }: PatchRetrospect) => {
    const res = await api.patch(`/space/${spaceId}/retrospect/${retrospectId}`, data);
    return res;
  };
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchRetrospect,
    onSuccess: async (_, variable) => {
      toast.success("회고 정보가 수정되었어요!");
      await queryClient.invalidateQueries({
        // TODO: queryKey 타입 재정의 필요
        queryKey: ["getRetrospects", variable.spaceId.toString()],
      });
    },
    onError: () => {
      toast.error("회고 수정을 실패하였습니다");
    },
  });
};
