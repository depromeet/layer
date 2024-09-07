import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

type createActionItemProps = {
  retrospectId: number;
  content: string;
};

export const useCreateActionItem = () => {
  const createActionItem = ({ retrospectId, content }: createActionItemProps) => {
    const res = api.post(`/api/action-item/create`, {
      retrospectId: retrospectId,
      content: content,
    });
    return res;
  };

  return useMutation({
    mutationFn: ({ retrospectId, content }: createActionItemProps) => createActionItem({ retrospectId, content }),
  });
};
