import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";

type ErrorType = {
  status: number;
  message: string;
};

export const useApiJoinSpace = () => {
  const joinSpace = async (spaceId: number) => {
    const res = await api.post(`/api/space/join`, null, { params: { spaceId } });
    return res;
  };

  return useMutation({
    mutationFn: (spaceId: number) => joinSpace(spaceId),
    onError: (error: ErrorType) => error,
  });
};
