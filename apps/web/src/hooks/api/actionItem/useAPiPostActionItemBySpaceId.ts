import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

type PostActionItemBySpaceIdProps = {
  spaceId: number;
  content: string;
};

const postActionItemBySpaceId = async ({ spaceId, content }: PostActionItemBySpaceIdProps) => {
  const data = await api.post(`/api/action-item/create/space/${spaceId}`, { spaceId: spaceId, content: content });
  return data;
};

export const useAPiPostActionItemBySpaceId = () => {
  return useMutation({
    mutationFn: postActionItemBySpaceId,
  });
};
