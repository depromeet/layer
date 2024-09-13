import { UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/api";
import { Retrospect } from "@/types/retrospect";

export type RestrospectResponse = {
  layerCount: number;
  retrospects: Retrospect[];
};

const spaceRestrospectFetch = async (spaceId: string | undefined) => {
  const response = await api.get<RestrospectResponse>(`/space/${spaceId}/retrospect`);
  return response.data;
};

export const useApiOptionsGetRetrospects = (spaceId?: string): UseQueryOptions<RestrospectResponse, Error, RestrospectResponse["retrospects"]> => ({
  queryKey: ["getRetrospects", spaceId!],
  queryFn: () => spaceRestrospectFetch(spaceId),
  select(data) {
    return data.retrospects;
  },
  enabled: !!spaceId,
});
