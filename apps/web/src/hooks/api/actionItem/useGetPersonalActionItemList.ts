import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { api } from "@/api";
import { PersonalActionItemListType } from "@/types/actionItem";

/**
 * 내 모든 스페이스의 "개인" 실행목표 조회
 * GET /api/action-item/personal/member
 *
 * 팀 실행목표(useGetActionItemList, /api/action-item/member)와 동일한 응답 구조를 가진다.
 */
export const useGetPersonalActionItemList = <TData = PersonalActionItemListType>({
  options,
}: {
  options?: Omit<UseQueryOptions<PersonalActionItemListType, Error, TData>, "queryKey" | "queryFn">;
}) => {
  const getPersonalActionItemList = () => {
    const res = api.get<PersonalActionItemListType>("/api/action-item/personal/member").then((res) => res.data);
    return res;
  };

  return useQuery<PersonalActionItemListType, Error, TData>({
    queryFn: () => getPersonalActionItemList(),
    queryKey: ["personalActionItemList"],
    ...options,
  });
};
