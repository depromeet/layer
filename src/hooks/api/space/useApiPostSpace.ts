import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";
import { SpaceValue } from "@/types/space";

export const useApiPostSpace = () => {
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
    onError: (error) => {
      console.log(error);
    },
  });
};
