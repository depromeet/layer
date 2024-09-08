import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import { CustomTemplateListRes } from "@/types/template";

type DeleteCustomTemplateReq = { formId: number };

export const useDeleteCustomTemplate = (spaceId: number) => {
  const deleteCustomTemplate = async ({ formId }: DeleteCustomTemplateReq) => {
    const { data } = await api.delete<DeleteCustomTemplateReq>(`/form/${formId}`);
    return data;
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomTemplate,
    onMutate: async (newTemplate) => {
      await queryClient.cancelQueries({ queryKey: ["getCustomTemplateList", spaceId] });
      const prevList = queryClient.getQueryData(["getCustomTemplateList", spaceId]);
      queryClient.setQueryData(["getCustomTemplateList", spaceId], (old: InfiniteData<CustomTemplateListRes["customTemplateList"]>) => {
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            content: page.content.filter((item) => item.id !== newTemplate.formId),
          })),
        };
      });
      return { prevList, newTemplate };
    },
    onError: (error, _, context) => {
      console.error("mutate error with", error);
      queryClient.setQueryData(["getCustomTemplateList", spaceId], context?.prevList);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getCustomTemplateList", spaceId] });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getCustomTemplateList", spaceId], //FIXME - query key 상수화
      });
    },
  });
};
