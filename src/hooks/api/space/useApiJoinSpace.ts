import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";

export const useApiJoinSpace = () => {
  const navigate = useNavigate();

  const joinSpace = async (spaceId: number) => {
    const res = await api.post(`/api/space/join`, null, { params: { spaceId } });
    return res;
  };

  return useMutation({
    mutationFn: (spaceId: number) => joinSpace(spaceId),
    onSuccess: () => {
      navigate("/space/create/done");
    },
    onError: (error: { status: number }) => {
      console.log(error);
      if (error.status === 400) {
        console.log("이미 참여한 스페이스 입니다");
      }
    },
  });
};
