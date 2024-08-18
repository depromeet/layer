import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

type RetrospectEditReq = {
  title: string;
  introduction: string;
  deadline: string;
};

type PostRetrospect = { spaceId: number; retrospectId: number; data: RetrospectEditReq };

export const usePatchRetrospect = () => {
  const patchRetrospect = async ({ spaceId, retrospectId, data }: PostRetrospect) => {
    const res = await api.patch(`/space/${spaceId}/retrospect/${retrospectId}`, data);
    return res;
  };

  return useMutation({
    mutationFn: patchRetrospect,
  });
};
