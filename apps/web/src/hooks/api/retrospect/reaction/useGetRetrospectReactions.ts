import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { retrospectReactionQueryKeys } from "@/hooks/api/retrospect/reaction/queryKeys";
import { RetrospectReactionResponse } from "@/types/retrospectReaction";

type UseGetRetrospectReactionsParams = {
  spaceId: number | null;
  retrospectId: number | null;
};

export const useGetRetrospectReactions = ({ spaceId, retrospectId }: UseGetRetrospectReactionsParams) => {
  return useQuery({
    queryKey: retrospectReactionQueryKeys.list(spaceId, retrospectId),
    queryFn: async () => {
      const response = await api.get<RetrospectReactionResponse>(`/space/${spaceId}/retrospect/${retrospectId}/reaction`);
      return response.data;
    },
    enabled: Boolean(spaceId && retrospectId),
  });
};
