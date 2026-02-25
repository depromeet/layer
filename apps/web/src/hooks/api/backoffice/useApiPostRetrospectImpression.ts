import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postRetrospectImpression } from "@/api/backoffice";

export const useApiPostRetrospectImpression = (options?: UseMutationOptions) => {
  return useMutation({
    mutationKey: ["postRetrospectImpression"],
    mutationFn: postRetrospectImpression,
    ...options,
  });
};
