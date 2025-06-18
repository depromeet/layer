import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { PATHS } from "@layer/shared";

export const useApiEditSpace = () => {
  const navigate = useNavigate();

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
      navigate(PATHS.spaceDetail(spaceId));
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
