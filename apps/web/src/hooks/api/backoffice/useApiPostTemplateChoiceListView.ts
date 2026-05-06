import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postTemplateChoiceListView } from "@/api/backoffice";
import { TemplateChoiceFormTag } from "@/types/template";

export const useApiPostTemplateChoiceListView = (options?: UseMutationOptions<unknown, Error, TemplateChoiceFormTag>) => {
  return useMutation({
    mutationFn: postTemplateChoiceListView,
    ...options,
  });
};
