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
    const { imgUrl, category, field, name, introduction } = formData;
    const res = await api.post<{ spaceId: number }>(`/api/space`, {
      bannerUrl: imgUrl,
      category,
      fieldList: field,
      name,
      introduction,
    });
    return res;
  };

  return useMutation({
    mutationFn: (formData: SpaceValue) => postSpace(formData),
    onSuccess: (data) => {
      console.log(data);
      const spaceId = data.data.spaceId;
      navigate(`/space/create/done/${spaceId}`);
      resetSpaceValue();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
