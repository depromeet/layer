import { UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/api";

type RestrospectResponse = {
  layerCount: number;
  retrospects: {
    retrospectId: number;
    title: string;
    introduction: string;
    isWrite: boolean;
    retrospectStatus: "PROCEEDING" | "DONE";
    writeCount: number;
    totalCount: number;
  }[];
};

const spaceRestrospectFetch = async (spaceId: string | undefined) => {
  const response = await api.get<RestrospectResponse>(`/space/${spaceId}/retrospect`);
  return response.data;
};

export const useApiOptionsGetRetrospects = (
  spaceId?: string,
): UseQueryOptions<RestrospectResponse, Error, RestrospectResponse["retrospects"], [string]> => ({
  queryKey: [spaceId!],
  queryFn: () => spaceRestrospectFetch(spaceId),
  select(data) {
    return data.retrospects;
  },
  enabled: !!spaceId,
});
