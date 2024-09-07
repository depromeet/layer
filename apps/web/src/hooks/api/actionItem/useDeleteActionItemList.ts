import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

export const useDeleteActionItemList = () => {
  const deleteActionItemList = ({ actionItemId }: { actionItemId: number }) => {
    const res = api.delete(`/api/action-item/${actionItemId}`);
    return res;
  };

  return useMutation({
    mutationFn: ({ actionItemId }: { actionItemId: number }) => deleteActionItemList({ actionItemId }),
  });
};
