import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import {
  addRetrospectReactionCache,
  createOptimisticReaction,
  invalidateRetrospectReactionCache,
  rollbackRetrospectReactionCache,
} from "@/hooks/api/retrospect/reaction/reactionCache";
import {
  RetrospectReactionCode,
  RetrospectReactionMember,
  RetrospectReactionResponse,
} from "@/types/retrospectReaction";

type PostRetrospectReactionParams = {
  spaceId: number;
  retrospectId: number;
  answerId: number;
  emojiCode: RetrospectReactionCode;
  member: RetrospectReactionMember;
};

type PostRetrospectReactionMutationParams = PostRetrospectReactionParams & {
  previousReactions?: RetrospectReactionResponse;
};

export const usePostRetrospectReaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ spaceId, retrospectId, answerId, emojiCode }: PostRetrospectReactionMutationParams) => {
      await api.post(`/space/${spaceId}/retrospect/${retrospectId}/reaction`, { answerId, emojiCode });
    },
    onError: (_, { spaceId, retrospectId, previousReactions }) => {
      rollbackRetrospectReactionCache(queryClient, { spaceId, retrospectId }, previousReactions);
    },
    onSettled: (_, __, { spaceId, retrospectId }) => {
      void invalidateRetrospectReactionCache(queryClient, { spaceId, retrospectId });
    },
  });

  const applyOptimisticPost = (params: PostRetrospectReactionParams): PostRetrospectReactionMutationParams => {
    const { spaceId, retrospectId, answerId, emojiCode, member } = params;
    const optimisticReaction = createOptimisticReaction(emojiCode, member);
    const { previousReactions } = addRetrospectReactionCache(
      queryClient,
      { spaceId, retrospectId },
      { answerId, reaction: optimisticReaction },
    );

    return { ...params, previousReactions };
  };

  return {
    ...mutation,
    mutate: (params: PostRetrospectReactionParams, options?: Parameters<typeof mutation.mutate>[1]) =>
      mutation.mutate(applyOptimisticPost(params), options),
    mutateAsync: (params: PostRetrospectReactionParams, options?: Parameters<typeof mutation.mutateAsync>[1]) =>
      mutation.mutateAsync(applyOptimisticPost(params), options),
  };
};
