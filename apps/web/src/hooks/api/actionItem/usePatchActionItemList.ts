import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

export type retrospectIdProps = {
  retrospectId: number;
  actionItems: {
    id: number;
    content: string;
  }[];
};

export const usePatchActionItemList = () => {
  const patchActionItemList = ({ retrospectId, actionItems }: retrospectIdProps) => {
    const res = api.patch(`/api/action-item/retrospect/${retrospectId}/update`, {
      actionItems: actionItems,
    });
    return res;
  };

  return useMutation({
    mutationFn: ({ retrospectId, actionItems }: retrospectIdProps) => patchActionItemList({ retrospectId, actionItems }),
  });
};
