import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postRetrospectClick } from "@/api/backoffice";

export const useApiPostRetrospectClick = (options?: UseMutationOptions<unknown, Error, number>) => {
  return useMutation({
    mutationFn: (retrospectId: number) => postRetrospectClick(retrospectId),
    ...options,
  });
};
