import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postTemplateClickRecommended } from "@/api/backoffice";

export const useApiPostTemplateClickRecommended = (options?: UseMutationOptions) => {
  return useMutation({
    mutationFn: postTemplateClickRecommended,
    ...options,
  });
};
