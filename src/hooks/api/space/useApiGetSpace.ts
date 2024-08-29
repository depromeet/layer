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
  leader: {
    id: number;
    name: string;
  };
};

export const useApiGetSpace = (spaceId: string, isPublic: boolean = false) => {
  const getSpace = async (spaceId: string, isPublic: boolean) => {
    const endpoint = isPublic ? `/api/space/public/${spaceId}` : `/api/space/${spaceId}`;
    const res = await api.get<SpaceResponse>(endpoint);

    return res.data;
  };

  return useQuery({
    queryKey: ["getSpace", spaceId],
    queryFn: () => getSpace(spaceId, isPublic),
  });
};
