import { UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/api";
import { TeamActionItemType } from "@/types/actionItem";

const getTeamActionItemList = async (spaceId: string | undefined) => {
  const response = await api.get<TeamActionItemType>(`/api/action-item/space/${spaceId}`);
  return response.data;
};

export const useApiOptionsGetTeamActionItemList = (
  spaceId?: string,
): UseQueryOptions<TeamActionItemType, Error, TeamActionItemType, [string, string]> => ({
  queryKey: ["getTeamActionItemList", spaceId!],
  queryFn: () => getTeamActionItemList(spaceId),
  select(data) {
    return data;
  },
  enabled: !!spaceId,
});
