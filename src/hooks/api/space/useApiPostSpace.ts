import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useResetAtom } from "jotai/utils";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { spaceState } from "@/store/space/spaceAtom";
import { SpaceValue } from "@/types/space";

export const useApiPostSpace = () => {
  const resetSpaceValue = useResetAtom(spaceState);
  const navigate = useNavigate();

  const postSpace = async (formData: SpaceValue): Promise<AxiosResponse<{ spaceId: number }>> => {
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
    onSuccess: ({ data: { spaceId } }) => {
      navigate("/space/create/done", {
        state: { spaceId },
      });
      resetSpaceValue();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
