import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";

export const useGetTemporaryQuestions = ({ spaceId, retrospectId }: { spaceId: number; retrospectId: number }) => {
  const getTemporaryQuestions = () => {
    const res = api.get(`/space/${spaceId}/retrospect/${retrospectId}/answer/tempoary`).then((res) => res.data);
    return res;
  };

  return useQuery({
    queryKey: ["temporaryQuestion"],
    queryFn: () => getTemporaryQuestions(),
  });
};
