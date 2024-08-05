import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";

type QuestionResponseType = {
  answers: {
    questionId: number;
    questionType: string;
    answerContent: string;
  }[];
};

export const useGetTemporaryQuestions = ({ spaceId, retrospectId }: { spaceId: number; retrospectId: number }) => {
  const getTemporaryQuestions = () => {
    const res = api.get<QuestionResponseType>(`/space/${spaceId}/retrospect/${retrospectId}/answer/temp`).then((res) => res.data);
    return res;
  };

  return useQuery({
    queryKey: ["temporaryQuestion", spaceId, retrospectId],
    queryFn: () => getTemporaryQuestions(),
    retry: 1,
  });
};
