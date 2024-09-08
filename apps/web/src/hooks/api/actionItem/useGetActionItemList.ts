import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";

type PersonalActionItemListType = {
  actionItems: {
    retrospectId: number;
    retrospectTitle: string;
    spaceId: number;
    spaceName: string;
    status: "PROCEEDING" | "DONE";
    deadline: string;
    actionItemList: {
      actionItemId: number;
      content: string;
    }[];
  }[];
};

export const useGetActionItemList = ({ memberId }: { memberId: string }) => {
  const getActionItemList = () => {
    const res = api.get<PersonalActionItemListType>(`/api/action-item/member?currentMemberId=${memberId}`).then((res) => res.data);
    return res;
  };

  return useQuery({
    queryFn: () => getActionItemList(),
    queryKey: [memberId],
  });
};
