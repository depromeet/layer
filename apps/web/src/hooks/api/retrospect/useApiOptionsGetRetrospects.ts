import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { Retrospect } from "@/types/retrospect";

export type RetrospectResponse = {
  layerCount: number;
  retrospects: Retrospect[];
};

const spaceRetrospectFetch = async (spaceId: string | undefined) => {
  const response = await api.get<RetrospectResponse>(`/space/${spaceId}/retrospect`);
  return response.data;
};

const getAllRetrospectsFetch = async () => {
  const response = await api.get<RetrospectResponse>("/retrospects");
  return response.data;
};

export const useApiOptionsGetRetrospects = (spaceId?: string): UseQueryOptions<RetrospectResponse, Error, RetrospectResponse["retrospects"]> => ({
  queryKey: ["getRetrospects", spaceId],
  queryFn: () => spaceRetrospectFetch(spaceId),
  select(data) {
    return data.retrospects;
  },
  enabled: !!spaceId,
});

// * 모든 회고 리스트 요청 API 훅
export const useGetAllRetrospects = (options?: Partial<UseQueryOptions<RetrospectResponse, Error, RetrospectResponse["retrospects"]>>) => {
  return useQuery({
    queryKey: ["getAllRetrospects"],
    queryFn: getAllRetrospectsFetch,
    select: (data) => data.retrospects,
    ...options,
  });
};
