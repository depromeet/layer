import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postTemplateClickListView } from "@/api/backoffice";

export const useApiPostTemplateClickListView = (options?: UseMutationOptions) => {
  return useMutation({
    mutationFn: postTemplateClickListView,
    ...options,
  });
};
