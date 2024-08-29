import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/api";

type DeleteCustomTemplateReq = { formId: number };

export const useDeleteCustomTemplate = (spaceId: number) => {
  const deleteCustomTemplate = async ({ formId }: DeleteCustomTemplateReq) => {
    const { data } = await api.delete<DeleteCustomTemplateReq>(`/form/${formId}`);
    return data;
  };

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomTemplate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getCustomTemplateList", spaceId], //FIXME - query key 상수화
      });
    },
  });
};
