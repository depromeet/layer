import { useMutation } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { spaceState } from "@/store/space/spaceAtom";
import { SpaceValue } from "@/types/space";

export const useApiPostSpace = () => {
  const resetSpaceValue = useResetAtom(spaceState);
  const navigate = useNavigate();

  const postSpace = async (formData: SpaceValue) => {
    const { imgUrl, category, field, name, introduction } = formData;
    const res = await api.post(`/api/space`, {
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
    onSuccess: () => {
      navigate("/space/create/done");
      resetSpaceValue();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
