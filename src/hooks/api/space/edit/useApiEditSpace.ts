import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { useToast } from "@/hooks/useToast";

export const useApiEditSpace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const editSpace = async (formData: { spaceId: string; imgUrl: string; name: string; introduction: string }) => {
    const { imgUrl, name, introduction, spaceId } = formData;
    await api.put<{ spaceId: number }>(`/api/space`, {
      id: spaceId,
      bannerUrl: imgUrl,
      name,
      introduction,
    });
    return spaceId;
  };

  return useMutation({
    mutationFn: (formData: { spaceId: string; imgUrl: string; name: string; introduction: string }) => editSpace(formData),
    onSuccess: (spaceId) => {
      navigate(`/space/${spaceId}`);
      toast.success("스페이스 수정 성공");
    },
    onError: (error) => {
      console.log(error);
      toast.success("스페이스 수정 실패");
    },
  });
};
