import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";

type AnswerResponseType = {
  answers: {
    questionId: number;
    questionType: string;
    answerContent: string;
  }[];
};
export const useGetAnswers = ({ spaceId, retrospectId }: { spaceId: number; retrospectId: number }) => {
  const getQuestions = () => {
    const res = api
      .get<AnswerResponseType>(
        `/space/${spaceId}/retrospect/${retrospectId}/answer/written
`,
      )
      .then((res) => res.data);
    return res;
  };

  return useQuery({
    queryKey: ["answers", spaceId, retrospectId],
    queryFn: () => getQuestions(),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
