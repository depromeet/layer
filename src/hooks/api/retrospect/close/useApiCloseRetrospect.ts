import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

type closeRetrospectProps = { spaceId: string; retrospectId: number };

export const useApiCloseRetrospect = () => {
  const closeRetrospect = ({ spaceId, retrospectId }: closeRetrospectProps) => {
    const res = api.patch(`/space/${spaceId}/retrospect/${retrospectId}/close`);
    return res;
  };

  return useMutation({
    mutationFn: ({ spaceId, retrospectId }: closeRetrospectProps) => closeRetrospect({ spaceId, retrospectId }),
  });
};
