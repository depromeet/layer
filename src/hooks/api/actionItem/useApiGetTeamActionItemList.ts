import { UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/api";

type ActionItemType = {
  actionItemContent: string;
  actionItemId: number;
  retrospectId: number;
  retrospectName: string;
};

type TeamActionItemResponse = {
  spaceId: number;
  spaceName: string;
  teamActionItemList: ActionItemType[];
};

const getTeamActionItemList = async (spaceId: string | undefined) => {
  const response = await api.get<TeamActionItemResponse>(`/api/action-item/space/${spaceId}`);
  return response.data;
};

export const useApiGetTeamActionItemList = (
  spaceId?: string,
): UseQueryOptions<TeamActionItemResponse, Error, TeamActionItemResponse["teamActionItemList"], [string, string]> => ({
  queryKey: ["getTeamActionItemList", spaceId!],
  queryFn: () => getTeamActionItemList(spaceId),
  select(data) {
    return data.teamActionItemList;
  },
  enabled: !!spaceId,
});
