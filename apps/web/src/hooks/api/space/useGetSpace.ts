import { useSuspenseQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { SpaceRes } from "@/types/space";

export const useGetSpace = (spaceId: number) => {
  const getSpace = async (): Promise<SpaceRes> => {
    const res = await api.get(`/api/space/${spaceId}`);
    return res.data as SpaceRes;
  };

  return useSuspenseQuery({
    queryKey: ["getSpace", spaceId],
    queryFn: getSpace,
  });
};
