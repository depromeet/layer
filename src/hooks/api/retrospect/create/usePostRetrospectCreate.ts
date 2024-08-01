import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { RetrospectCreateReq } from "@/types/retrospectCreate";

type PostRetrospect = { spaceId: number; body: RetrospectCreateReq };

const postRetrospect = async ({ spaceId, body }: PostRetrospect): Promise<AxiosResponse<{ retrospectId: number }>> => {
  const data = await api.post(`/space/${spaceId}/retrospect`, body, {
    headers: {
      Authorization: Cookies.get("accessToken"),
    },
  });
  return data;
};

export const usePostRetrospectCreate = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postRetrospect,
    onSuccess: ({ data: { retrospectId } }) => {
      navigate(`/write`, {
        state: { retrospectId },
      });
    },
  });
};