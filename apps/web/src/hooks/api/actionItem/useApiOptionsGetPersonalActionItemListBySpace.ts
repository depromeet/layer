import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api";
import { PersonalActionItemListBySpaceType } from "@/types/actionItem";

const getPersonalActionItemListBySpace = async (spaceId: number) => {
  const response = await api.get<PersonalActionItemListBySpaceType>(`/api/action-item/personal/space/${spaceId}`);
  return response.data;
};

export const useApiOptionsGetPersonalActionItemListBySpace = (spaceId?: number) =>
  queryOptions({
    queryKey: ["getPersonalActionItemListBySpace", spaceId] as const,
    queryFn: () => {
      if (spaceId == null) throw new Error("spaceId is required");
      return getPersonalActionItemListBySpace(spaceId);
    },
    enabled: spaceId != null,
  });
