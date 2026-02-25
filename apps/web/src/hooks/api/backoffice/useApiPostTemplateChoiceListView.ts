import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postTemplateChoiceListView } from "@/api/backoffice";

export const useApiPostTemplateChoiceListView = (options?: UseMutationOptions) => {
  return useMutation({
    mutationFn: postTemplateChoiceListView,
    ...options,
  });
};
