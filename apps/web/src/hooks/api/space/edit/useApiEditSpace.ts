import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { PATHS } from "@layer/shared";
import { getDeviceType } from "@/utils/deviceUtils";
import { useToast } from "@/hooks/useToast";

export const useApiEditSpace = () => {
  const navigate = useNavigate();
  const { isMobile } = getDeviceType();
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
      if (isMobile) navigate(PATHS.spaceDetail(spaceId));
      else toast.success("스페이스 수정이 완료되었습니다.");
    },
    onError: (error) => {
      console.log(error);
      toast.error("스페이스 수정에 실패했습니다. 다시 시도해주세요.");
    },
  });
};
