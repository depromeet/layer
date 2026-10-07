import { QueryClient } from "@tanstack/react-query";

import { retrospectReactionQueryKeys } from "@/hooks/api/retrospect/reaction/queryKeys";
import {
  RETROSPECT_REACTIONS,
  RetrospectReaction,
  RetrospectReactionCode,
  RetrospectReactionMember,
  RetrospectReactionResponse,
} from "@/types/retrospectReaction";

type ReactionQueryIds = {
  spaceId: number;
  retrospectId: number;
};

let optimisticReactionId = -1;

export const createOptimisticReaction = (
  emojiCode: RetrospectReactionCode,
  member: RetrospectReactionMember,
): RetrospectReaction => ({
  retrospectReactionId: optimisticReactionId--,
  emojiCode,
  description: RETROSPECT_REACTIONS[emojiCode].label,
  ...member,
});

export const updateRetrospectReactionCache = (
  queryClient: QueryClient,
  { spaceId, retrospectId }: ReactionQueryIds,
  updater: (current: RetrospectReactionResponse | undefined) => RetrospectReactionResponse,
) => {
  const queryKey = retrospectReactionQueryKeys.list(spaceId, retrospectId);
  void queryClient.cancelQueries({ queryKey }, { revert: false });
  const previousReactions = queryClient.getQueryData<RetrospectReactionResponse>(queryKey);

  queryClient.setQueryData<RetrospectReactionResponse>(queryKey, updater);

  return { previousReactions };
};

export const addRetrospectReactionCache = (
  queryClient: QueryClient,
  ids: ReactionQueryIds,
  { answerId, reaction }: { answerId: number; reaction: RetrospectReaction },
) => {
  return updateRetrospectReactionCache(queryClient, ids, (current) => {
    const answerReactions = current?.answerReactions ?? [];
    const hasAnswer = answerReactions.some((item) => item.answerId === answerId);

    return {
      answerReactions: hasAnswer
        ? answerReactions.map((item) =>
            item.answerId === answerId ? { ...item, reactions: [reaction, ...item.reactions] } : item,
          )
        : [...answerReactions, { answerId, reactions: [reaction] }],
    };
  });
};

export const removeRetrospectReactionCache = (
  queryClient: QueryClient,
  ids: ReactionQueryIds,
  retrospectReactionId: number,
) => {
  return updateRetrospectReactionCache(queryClient, ids, (current) => ({
    answerReactions:
      current?.answerReactions.map((item) => ({
        ...item,
        reactions: item.reactions.filter((reaction) => reaction.retrospectReactionId !== retrospectReactionId),
      })) ?? [],
  }));
};

export const rollbackRetrospectReactionCache = (
  queryClient: QueryClient,
  { spaceId, retrospectId }: ReactionQueryIds,
  previousReactions?: RetrospectReactionResponse,
) => {
  queryClient.setQueryData(retrospectReactionQueryKeys.list(spaceId, retrospectId), previousReactions);
};

export const invalidateRetrospectReactionCache = (queryClient: QueryClient, { spaceId, retrospectId }: ReactionQueryIds) => {
  return queryClient.invalidateQueries({ queryKey: retrospectReactionQueryKeys.list(spaceId, retrospectId) });
};
