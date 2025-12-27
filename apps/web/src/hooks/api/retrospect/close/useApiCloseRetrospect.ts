import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";
import { queryClient } from "@/lib/tanstack-query/queryClient";

type closeRetrospectProps = { spaceId: string; retrospectId: number };

export const useApiCloseRetrospect = () => {
  const { toast } = useToast();
  const closeRetrospect = ({ spaceId, retrospectId }: closeRetrospectProps) => {
    const res = api.patch(`/space/${spaceId}/retrospect/${retrospectId}/close`);
    return res;
  };

  return useMutation({
    mutationFn: ({ spaceId, retrospectId }: closeRetrospectProps) => closeRetrospect({ spaceId, retrospectId }),
    onSuccess: async (_, variable) => {
      toast.success("회고 마감이 완료되었어요");
      await queryClient.invalidateQueries({
        queryKey: ["getRetrospects", variable.spaceId.toString()],
      });
    },
    onError: () => {
      toast.error("회고 마감 중 오류가 발생했어요, 다시 시도해주세요");
    },
  });
};
