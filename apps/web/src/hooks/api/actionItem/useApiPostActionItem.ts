import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

type PostActionItemProps = {
  retrospectId: number;
  content: string;
};

const postActionItem = async ({ retrospectId, content }: PostActionItemProps) => {
  const data = await api.post("/api/action-item/create", { retrospectId: retrospectId, content: content });
  return data;
};

export const useApiPostActionItem = () => {
  return useMutation({
    mutationFn: postActionItem,
  });
};
