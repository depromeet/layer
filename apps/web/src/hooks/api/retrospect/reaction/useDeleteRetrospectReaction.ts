import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import {
  invalidateRetrospectReactionCache,
  removeRetrospectReactionCache,
  rollbackRetrospectReactionCache,
} from "@/hooks/api/retrospect/reaction/reactionCache";
import { retrospectReactionQueryKeys } from "@/hooks/api/retrospect/reaction/queryKeys";
import { RetrospectReactionCode, RetrospectReactionResponse } from "@/types/retrospectReaction";

type DeleteRetrospectReactionParams = {
  spaceId: number;
  retrospectId: number;
  retrospectReactionId: number;
  answerId?: number;
  memberId?: number;
  emojiCode?: RetrospectReactionCode;
  pendingCreate?: Promise<void> | null;
};

type DeleteRetrospectReactionMutationParams = DeleteRetrospectReactionParams & {
  previousReactions?: RetrospectReactionResponse;
};

export const useDeleteRetrospectReaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      spaceId,
      retrospectId,
      retrospectReactionId,
      answerId,
      memberId,
      emojiCode,
      pendingCreate,
    }: DeleteRetrospectReactionMutationParams) => {
      let reactionId = retrospectReactionId;

      if (reactionId < 0) {
        try {
          await pendingCreate;
        } catch {
          return;
        }

        await queryClient.cancelQueries(
          { queryKey: retrospectReactionQueryKeys.list(spaceId, retrospectId) },
          { revert: false },
        );
        const response = await api.get<RetrospectReactionResponse>(
          `/space/${spaceId}/retrospect/${retrospectId}/reaction`,
        );
        reactionId =
          response.data.answerReactions
            .find((item) => item.answerId === answerId)
            ?.reactions.find((reaction) => reaction.memberId === memberId && reaction.emojiCode === emojiCode)
            ?.retrospectReactionId ?? reactionId;
      }

      if (reactionId < 0) return;
      await api.delete(`/space/${spaceId}/retrospect/${retrospectId}/reaction/${reactionId}`);
    },
    onError: (_, { spaceId, retrospectId, previousReactions }) => {
      rollbackRetrospectReactionCache(queryClient, { spaceId, retrospectId }, previousReactions);
    },
    onSettled: (_, __, { spaceId, retrospectId }) => {
      void invalidateRetrospectReactionCache(queryClient, { spaceId, retrospectId });
    },
  });

  const applyOptimisticDelete = (params: DeleteRetrospectReactionParams): DeleteRetrospectReactionMutationParams => {
    const { spaceId, retrospectId, retrospectReactionId } = params;
    const { previousReactions } = removeRetrospectReactionCache(
      queryClient,
      { spaceId, retrospectId },
      retrospectReactionId,
    );

    return { ...params, previousReactions };
  };

  return {
    ...mutation,
    mutate: (params: DeleteRetrospectReactionParams, options?: Parameters<typeof mutation.mutate>[1]) =>
      mutation.mutate(applyOptimisticDelete(params), options),
    mutateAsync: (params: DeleteRetrospectReactionParams, options?: Parameters<typeof mutation.mutateAsync>[1]) =>
      mutation.mutateAsync(applyOptimisticDelete(params), options),
  };
};
