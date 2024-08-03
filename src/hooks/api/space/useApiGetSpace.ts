import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { FieldType, ProjectType } from "@/types/space";

type SpaceResponse = {
  bannerUrl: string;
  category: ProjectType;
  fieldList: FieldType[];
  formId: number | null;
  id: number;
  introduction: string;
  memberCount: number;
  name: string;
};

export const useApiGetSpace = (spaceId: string) => {
  const getSpace = async (spaceId: string) => {
    const res = await api.get<SpaceResponse>(`/api/space/${spaceId}`);
    return res.data;
  };

  return useQuery({
    queryKey: ["getSpace", spaceId],
    queryFn: () => getSpace(spaceId),
  });
};
