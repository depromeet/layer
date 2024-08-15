import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";

export const useApiJoinSpace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const joinSpace = async (spaceId: number) => {
    const res = await api.post(`/api/space/join`, null, { params: { spaceId } });
    return res;
  };

  return useMutation({
    mutationFn: (spaceId: number) => joinSpace(spaceId),
    onSuccess: () => {
      toast.success("팀에 초대 되었습니다.");
      // FIXME: 플로우 정해지면 수정
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
