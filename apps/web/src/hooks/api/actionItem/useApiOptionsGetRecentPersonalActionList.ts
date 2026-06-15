import { UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/api";

export type RecentPersonalActionItem = {
  actionItemId: number;
  content: string;
  retrospectId: number;
  retrospectTitle: string;
  createdAt: string;
};

type RecentPersonalActionItemList = {
  spaceId: number;
  spaceName: string;
  personalActionItemList: RecentPersonalActionItem[];
};

const getRecentPersonalActionItemList = async (spaceId: number) => {
  const response = await api.get<RecentPersonalActionItemList>(`/api/action-item/personal/space/${spaceId}/recent`);
  return response.data;
};

export const useApiOptionsGetRecentPersonalActionList = (
  spaceId?: number,
): UseQueryOptions<RecentPersonalActionItemList, Error, RecentPersonalActionItemList, [string, number | undefined]> => ({
  queryKey: ["getRecentPersonalActionItemList", spaceId],
  queryFn: () => {
    if (spaceId == null) throw new Error("spaceId is required");
    return getRecentPersonalActionItemList(spaceId);
  },
  enabled: spaceId != null,
});
