import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";

type PostRecentTemplatIdReq = { formId: number; spaceId: number };

export const usePostRecentTemplateId = (spaceId: number) => {
  const postRecentTemplateId = async ({ formId, spaceId }: PostRecentTemplatIdReq) => {
    const { data } = await api.post<PostRecentTemplatIdReq>(`/form/recommend`, { formId, spaceId });
    return data;
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postRecentTemplateId,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getSpaceInfo", String(spaceId)], //FIXME - query key 상수화
      });
    },
  });
};
