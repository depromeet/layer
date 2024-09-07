import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { RetrospectType } from "@/types/write";

type GetQuetionsResponse = {
  isTemporarySaved: boolean;
  questions: {
    order: number;
    question: string;
    questionId: number;
    questionType: RetrospectType;
  }[];
};

export const useGetQuestions = ({ spaceId, retrospectId }: { spaceId: number; retrospectId: number }) => {
  const getQuestions = () => {
    const res = api
      .get<GetQuetionsResponse>(
        `/space/${spaceId}/retrospect/${retrospectId}/question
`,
      )
      .then((res) => res.data);
    return res;
  };

  return useQuery({
    queryKey: ["questions", spaceId, retrospectId],
    queryFn: () => getQuestions(),
  });
};
