import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

export const useDeletePersonalActionItemList = () => {
  const deletePersonalActionItemList = ({ actionItemId }: { actionItemId: number }) => {
    const res = api.delete(`/api/action-item/personal/${actionItemId}`);
    return res;
  };

  return useMutation({
    mutationFn: ({ actionItemId }: { actionItemId: number }) => deletePersonalActionItemList({ actionItemId }),
  });
};
