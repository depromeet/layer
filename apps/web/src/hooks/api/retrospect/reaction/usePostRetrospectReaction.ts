import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import {
  createOptimisticReaction,
  invalidateRetrospectReactionCache,
  rollbackRetrospectReactionCache,
  updateRetrospectReactionCache,
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

  return useMutation({
    mutationFn: async ({ spaceId, retrospectId, answerId, emojiCode }: PostRetrospectReactionParams) => {
      await api.post(`/space/${spaceId}/retrospect/${retrospectId}/reaction`, { answerId, emojiCode });
    },
    onMutate: async ({ spaceId, retrospectId, answerId, emojiCode, member }) => {
      const optimisticReaction = createOptimisticReaction(emojiCode, member);
      const context = updateRetrospectReactionCache(queryClient, { spaceId, retrospectId }, (current) => {
        const answerReactions = current?.answerReactions ?? [];
        const hasAnswer = answerReactions.some((item) => item.answerId === answerId);

        return {
          answerReactions: hasAnswer
            ? answerReactions.map((item) =>
                item.answerId === answerId ? { ...item, reactions: [...item.reactions, optimisticReaction] } : item,
              )
            : [...answerReactions, { answerId, reactions: [optimisticReaction] }],
        };
      });

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
