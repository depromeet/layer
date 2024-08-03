import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { PATHS } from "@/config/paths";
import { RetrospectCreateReq } from "@/types/retrospectCreate";

type PostRetrospect = { spaceId: number; body: RetrospectCreateReq };

type RetrospectCreateRes = { retrospectId: number };

export const usePostRetrospectCreate = (spaceId: number) => {
  const navigate = useNavigate();

  const postRetrospect = async ({ spaceId, body }: PostRetrospect): Promise<RetrospectCreateRes> => {
    const res = await api.post(`/space/${spaceId}/retrospect`, body);
    return res.data as RetrospectCreateRes;
  };

  return useMutation({
    mutationFn: postRetrospect,
    onSuccess: ({ retrospectId }) => {
      navigate(PATHS.completeRetrospectCreate(), {
        state: { retrospectId, spaceId },
      });
    },
  });
};
