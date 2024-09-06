import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";
import { CustomTemplateListRes } from "@/types/template";

type PatchTemplateTitle = { formTitle: string; formId: number };

export const usePatchTemplateTitle = (spaceId: number) => {
  const patchTemplateTitle = async ({ formTitle, formId }: PatchTemplateTitle) => {
    const res = await api.patch(`/form/${formId}/title`, { formTitle });
    return res;
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchTemplateTitle,
    onMutate: async (newTemplate) => {
      await queryClient.cancelQueries({ queryKey: ["getCustomTemplateList", spaceId] });
      const prevList = queryClient.getQueryData(["getCustomTemplateList", spaceId]);
      queryClient.setQueryData(["getCustomTemplateList", spaceId], (old: InfiniteData<CustomTemplateListRes["customTemplateList"]>) => {
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            content: page.content.map((item) => (item.id === newTemplate.formId ? { ...item, title: newTemplate.formTitle } : item)),
          })),
        };
      });
      console.log("mutate called with", newTemplate);
      return { prevList, newTemplate };
    },
    onError: (error, _, context) => {
      console.error("mutate error with", error);
      queryClient.setQueryData(["getCustomTemplateList", spaceId], context?.prevList);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getCustomTemplateList", spaceId] });
    },
  });
};
