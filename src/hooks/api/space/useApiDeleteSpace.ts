import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

export const useApiDeleteSpace = () => {
  const navigate = useNavigate();

  const retrospectDelete = async (spaceId: string | undefined) => {
    const response = await api.post(`/api/space/leave`, { spaceId: spaceId });
    return response;
  };

  return useMutation({
    mutationFn: (spaceId: string) => retrospectDelete(spaceId),
    onSuccess: () => {
      navigate("/home/retrospect");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
