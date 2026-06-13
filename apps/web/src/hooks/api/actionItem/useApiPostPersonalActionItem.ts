import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

type PostPersonalActionItemProps = {
  spaceId: number;
  retrospectId: number;
  content: string;
};

const postPersonalActionItem = async ({ spaceId, retrospectId, content }: PostPersonalActionItemProps) => {
  const data = await api.post(`/api/action-item/personal/space/${spaceId}/retrospect/${retrospectId}`, { content });
  return data;
};

export const useApiPostPersonalActionItem = () => {
  return useMutation({
    mutationFn: postPersonalActionItem,
  });
};
