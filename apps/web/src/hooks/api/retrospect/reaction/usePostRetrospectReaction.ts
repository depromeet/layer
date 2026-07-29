import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import {
  addRetrospectReactionCache,
  createOptimisticReaction,
  invalidateRetrospectReactionCache,
  rollbackRetrospectReactionCache,
} from "@/hooks/api/retrospect/reaction/reactionCache";
import { RetrospectReactionCode, RetrospectReactionMember } from "@/types/retrospectReaction";

type PostRetrospectReactionParams = {
  spaceId: number;
  retrospectId: number;
  answerId: number;
  emojiCode: RetrospectReactionCode;
  member: RetrospectReactionMember;
};

export const usePostRetrospectReaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ spaceId, retrospectId, answerId, emojiCode }: PostRetrospectReactionParams) => {
      await api.post(`/space/${spaceId}/retrospect/${retrospectId}/reaction`, { answerId, emojiCode });
    },
    onSettled: (_, __, { spaceId, retrospectId }) => {
      void invalidateRetrospectReactionCache(queryClient, { spaceId, retrospectId });
    },
  });

  const applyOptimisticPost = (params: PostRetrospectReactionParams) => {
    const { spaceId, retrospectId, answerId, emojiCode, member } = params;
    const optimisticReaction = createOptimisticReaction(emojiCode, member);
    return addRetrospectReactionCache(
      queryClient,
      { spaceId, retrospectId },
      { answerId, reaction: optimisticReaction },
    );
  };

  const optimisticMutate = (params: PostRetrospectReactionParams, options?: Parameters<typeof mutation.mutate>[1]) => {
    const { previousReactions } = applyOptimisticPost(params);

    mutation.mutate(params, {
      ...options,
      onError: (error, variables, context) => {
        rollbackRetrospectReactionCache(queryClient, params, previousReactions);
        options?.onError?.(error, variables, context);
      },
    });
  };

  const optimisticMutateAsync = async (
    params: PostRetrospectReactionParams,
    options?: Parameters<typeof mutation.mutateAsync>[1],
  ) => {
    const { previousReactions } = applyOptimisticPost(params);

    return mutation.mutateAsync(params, {
      ...options,
      onError: (error, variables, context) => {
        rollbackRetrospectReactionCache(queryClient, params, previousReactions);
        options?.onError?.(error, variables, context);
      },
    });
  };

  return {
    ...mutation,
    optimisticMutate,
    optimisticMutateAsync,
  };
};
