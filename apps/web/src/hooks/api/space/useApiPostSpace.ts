import { useMutation } from "@tanstack/react-query";
import { useResetAtom } from "jotai/utils";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import { spaceState } from "@/store/space/spaceAtom";
import { SpaceValue } from "@/types/space";

export const useApiPostSpace = () => {
  const navigate = useNavigate();
  const resetSpaceValue = useResetAtom(spaceState);
  const { track } = useMixpanel();

  const postSpace = async (formData: SpaceValue) => {
    const { imgUrl: bannerUrl, category, field: fieldList, name, introduction } = formData;
    const res = await api.post<{ spaceId: number }>(`/api/space`, {
      bannerUrl,
      category,
      fieldList,
      name,
      introduction,
    });
    return res.data;
  };

  return useMutation({
    mutationFn: (formData: SpaceValue) => postSpace(formData),
    onSuccess: ({ spaceId }, variables) => {
      track("SPACE_CREATE", {
        category: variables.category,
        field: variables.field,
        introduction: variables.introduction,
        name: variables.name,
      });

      navigate(`/space/create/done`, { state: { spaceId } });
      resetSpaceValue();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
