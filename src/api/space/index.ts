import { api } from "@/api";

export const retrospectDelete = async (spaceId: string | undefined) => {
  const response = await api.post(`/api/space/leave`, { spaceId: spaceId });
  return response;
};
