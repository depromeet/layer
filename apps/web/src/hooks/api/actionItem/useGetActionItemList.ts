import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/api";
import { PersonalActionItemListType } from "@/types/actionItem";

export const useGetActionItemList = <TData = PersonalActionItemListType>({
  memberId,
  options,
}: {
  memberId: string;
  options?: Omit<UseQueryOptions<PersonalActionItemListType, Error, TData>, "queryKey" | "queryFn">;
}) => {
  const getActionItemList = () => {
    const res = api.get<PersonalActionItemListType>(`/api/action-item/member?currentMemberId=${memberId}`).then((res) => res.data);
    return res;
  };

  return useQuery<PersonalActionItemListType, Error, TData>({
    queryFn: () => getActionItemList(),
    queryKey: [memberId],
    ...options,
  });
};
