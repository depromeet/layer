import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postSpacesImpression } from "@/api/backoffice";

export const useApiPostSpacesImpression = (options?: UseMutationOptions) => {
  return useMutation({
    mutationFn: postSpacesImpression,
    ...options,
  });
};
