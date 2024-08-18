import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

type PostActioItemProps = {
  retrospectId: number;
  content: string;
};

const postActionItem = async ({ retrospectId, content }: PostActioItemProps) => {
  const data = await api.post("api/action-item/create", { retrospectId: retrospectId, content: content });
  return data;
};

export const useApiPostActionItem = () => {
  return useMutation({
    mutationFn: postActionItem,
  });
};
