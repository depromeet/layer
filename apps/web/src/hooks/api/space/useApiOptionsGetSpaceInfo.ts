import { UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/api";
import { Space } from "@/types/spaceType";

const spaceInfoFetch = async (spaceId: string | undefined) => {
  const response = await api.get<Space>(`/api/space/${spaceId}`);
  return response.data;
};

export const useApiOptionsGetSpaceInfo = (spaceId?: string): UseQueryOptions<Space, Error, Space, [string, string]> => ({
  queryKey: ["getSpaceInfo", spaceId!],
  queryFn: () => spaceInfoFetch(spaceId),
  enabled: !!spaceId,
});
