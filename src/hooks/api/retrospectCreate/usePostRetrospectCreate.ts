import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { RetrospectCreateReq } from "@/types/retrospectCreate";

type PostRetrospect = { spaceId: number; body: RetrospectCreateReq };

const postRetrospect = async ({ spaceId, body }: PostRetrospect) => {
  const data = await api.post(`/space/${spaceId}/retrospect`, body);
  return data;
};

export const usePostRetrospectCreate = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postRetrospect,
    onSuccess: (data) => {
      navigate(`/write`, {
        state: { retrospectId: data },
      });
    },
  });
};