import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import { RetrospectResponse } from "@/hooks/api/retrospect/useApiOptionsGetRetrospects";
import { useToast } from "@/hooks/useToast";

export const useApiDeleteRetrospect = () => {
  const { toast } = useToast();

  const retrospectDelete = async (spaceId: string | undefined, retrospectId: string | undefined) => {
    const response = await api.delete(`/space/${spaceId}/retrospect/${retrospectId}`);
    return response;
  };

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ spaceId, retrospectId }: { spaceId: string | undefined; retrospectId: string | undefined }) =>
      retrospectDelete(spaceId, retrospectId),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["getRetrospects", variables.spaceId] });
      const prevList = queryClient.getQueryData(["getRetrospects", variables.spaceId]);
      queryClient.setQueryData(["getRetrospects", variables.spaceId], (old: RetrospectResponse) => {
        return {
          ...old,
          retrospects: old.retrospects.filter((item) => item.retrospectId !== Number(variables.retrospectId)),
        };
      });
      return { prevList };
    },
    onError: (error, variables, context) => {
      toast.error("다시 시도해주세요");
      console.error("mutate error with", error);
      queryClient.setQueryData(["getRetrospects", variables.spaceId], context?.prevList);
    },
    onSettled: async (_, __, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["getRetrospects", variables.spaceId] });
    },
    onSuccess: () => {
      toast.success("회고 삭제에 성공하였습니다.");
    },
  });
};
