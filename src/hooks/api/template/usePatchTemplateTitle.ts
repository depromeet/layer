import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";

type PatchTemplateTitle = { formTitle: string; formId: number };

export const usePatchTemplateTitle = (spaceId: number) => {
  const patchTemplateTitle = async ({ formTitle, formId }: PatchTemplateTitle) => {
    const { data } = await api.patch<PatchTemplateTitle>(`/form/${formId}/title`, { formTitle });
    return data;
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchTemplateTitle,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getCustomTemplateList", spaceId], //FIXME - query key 상수화
      });
    },
  });
};
