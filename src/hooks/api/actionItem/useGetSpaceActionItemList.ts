import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";

type PersonalActionItemListType = {
  spaceId: number;
  spaceName: string;
  teamActionItemList: {
    retrospectId: number;
    retrospectTitle: string;
    deadline: string;
    status: "PROCEEDING" | "DONE";
    actionItemList: {
      actionItemId: number;
      content: string;
    }[];
  }[];
};

export const useGetSpaceActionItemList = ({ spaceId }: { spaceId: string }) => {
  const getActionItemList = () => {
    const res = api.get<PersonalActionItemListType>(`/api/action-item/space/${spaceId}`).then((res) => res.data);
    return res;
  };

  return useQuery({
    queryFn: () => getActionItemList(),
    queryKey: [spaceId],
  });
};
