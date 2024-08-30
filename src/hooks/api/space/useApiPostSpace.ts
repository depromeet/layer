import { useMutation } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { spaceState } from "@/store/space/spaceAtom";
import { SpaceValue } from "@/types/space";

export const useApiPostSpace = () => {
  const navigate = useNavigate();
  const resetSpaceValue = useResetAtom(spaceState);

  const postSpace = async (formData: SpaceValue) => {
    const { imgUrl: bannerUrl, category, field, name, introduction } = formData;
    const res = await api.post<{ spaceId: number }>(`/api/space`, {
      bannerUrl,
      category,
      fieldList: field,
      name,
      introduction,
    });
    return res.data;
  };

  return useMutation({
    mutationFn: (formData: SpaceValue) => postSpace(formData),
    onSuccess: ({ spaceId }) => {
      navigate(`/space/create/done`, { state: { spaceId } });
      resetSpaceValue();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
