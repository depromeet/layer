import { UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/api";
import { PersonalActionItemListBySpaceType } from "@/types/actionItem";

const getPersonalActionItemListBySpace = async (spaceId: number | undefined) => {
  const response = await api.get<PersonalActionItemListBySpaceType>(`/api/action-item/personal/space/${spaceId}`);
  return response.data;
};

export const useApiOptionsGetPersonalActionItemListBySpace = (
  spaceId?: number,
): UseQueryOptions<PersonalActionItemListBySpaceType, Error, PersonalActionItemListBySpaceType, [string, number]> => ({
  queryKey: ["getPersonalActionItemListBySpace", spaceId!],
  queryFn: () => getPersonalActionItemListBySpace(spaceId),
  enabled: !!spaceId,
});
