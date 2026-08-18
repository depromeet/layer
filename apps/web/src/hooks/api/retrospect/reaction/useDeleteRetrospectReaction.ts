import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import {
  invalidateRetrospectReactionCache,
  removeRetrospectReactionCache,
  rollbackRetrospectReactionCache,
} from "@/hooks/api/retrospect/reaction/reactionCache";
import { retrospectReactionQueryKeys } from "@/hooks/api/retrospect/reaction/queryKeys";
import {
  RetrospectReactionCode,
  RetrospectReactionResponse,
} from "@/types/retrospectReaction";

type DeleteRetrospectReactionParams = {
  spaceId: number;
  retrospectId: number;
  retrospectReactionId: number;
  answerId?: number;
  memberId?: number;
  emojiCode?: RetrospectReactionCode;
  pendingCreate?: Promise<void> | null;
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
    }: DeleteRetrospectReactionParams) => {
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
    onSettled: (_, __, { spaceId, retrospectId }) => {
      void invalidateRetrospectReactionCache(queryClient, { spaceId, retrospectId });
    },
  });

  const applyOptimisticDelete = (params: DeleteRetrospectReactionParams) => {
    const { spaceId, retrospectId, retrospectReactionId } = params;
    return removeRetrospectReactionCache(
      queryClient,
      { spaceId, retrospectId },
      retrospectReactionId,
    );
  };

  const optimisticMutate = (params: DeleteRetrospectReactionParams, options?: Parameters<typeof mutation.mutate>[1]) => {
    const { previousReactions } = applyOptimisticDelete(params);

    mutation.mutate(params, {
      ...options,
      onError: (error, variables, context) => {
        rollbackRetrospectReactionCache(queryClient, params, previousReactions);
        options?.onError?.(error, variables, context);
      },
    });
  };

  const optimisticMutateAsync = async (
    params: DeleteRetrospectReactionParams,
    options?: Parameters<typeof mutation.mutateAsync>[1],
  ) => {
    const { previousReactions } = applyOptimisticDelete(params);

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
