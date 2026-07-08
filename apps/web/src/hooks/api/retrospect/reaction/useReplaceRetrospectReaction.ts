import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import {
  createOptimisticReaction,
  invalidateRetrospectReactionCache,
  rollbackRetrospectReactionCache,
  updateRetrospectReactionCache,
} from "@/hooks/api/retrospect/reaction/reactionCache";
import { RetrospectReactionCode, RetrospectReactionMember } from "@/types/retrospectReaction";

type ReplaceRetrospectReactionParams = {
  spaceId: number;
  retrospectId: number;
  answerId: number;
  previousReactionId: number;
  emojiCode: RetrospectReactionCode;
  member: RetrospectReactionMember;
};

export const useReplaceRetrospectReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ spaceId, retrospectId, answerId, previousReactionId, emojiCode }: ReplaceRetrospectReactionParams) => {
      await api.delete(`/space/${spaceId}/retrospect/${retrospectId}/reaction/${previousReactionId}`);
      await api.post(`/space/${spaceId}/retrospect/${retrospectId}/reaction`, { answerId, emojiCode });
    },
    onMutate: async ({ spaceId, retrospectId, previousReactionId, emojiCode, member }) => {
      const optimisticReaction = createOptimisticReaction(emojiCode, member);
      const context = updateRetrospectReactionCache(queryClient, { spaceId, retrospectId }, (current) => ({
        answerReactions:
          current?.answerReactions.map((item) => ({
            ...item,
            reactions: item.reactions.map((reaction) =>
              reaction.retrospectReactionId === previousReactionId ? optimisticReaction : reaction,
            ),
          })) ?? [],
      }));

      await context.cancelQueries;
      return context;
    },
    onError: (_, { spaceId, retrospectId }, context) => {
      rollbackRetrospectReactionCache(queryClient, { spaceId, retrospectId }, context?.previousReactions);
    },
    onSettled: (_, __, { spaceId, retrospectId }) => {
      void invalidateRetrospectReactionCache(queryClient, { spaceId, retrospectId });
    },
  });
};
