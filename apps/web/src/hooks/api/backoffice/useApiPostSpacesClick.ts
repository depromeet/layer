import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { postSpacesClick } from "@/api/backoffice";

export const useApiPostSpacesClick = (options?: UseMutationOptions<unknown, Error, number>) => {
  return useMutation({
    mutationFn: (spaceId: number) => postSpacesClick(spaceId),
    ...options,
  });
};
