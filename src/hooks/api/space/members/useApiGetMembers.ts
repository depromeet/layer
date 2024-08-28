import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";

type MembersResponse = {
  avatar: string | null;
  id: string;
  isLeader: boolean;
  name: string;
};

export const useApiGetMemers = (spaceId: string) => {
  const getMembers = async (spaceId: string) => {
    const res = await api.get<MembersResponse[]>(`/api/space/members/${spaceId}`);
    return res.data;
  };

  return useQuery({
    queryKey: ["getMembers", spaceId],
    queryFn: () => getMembers(spaceId),
  });
};
