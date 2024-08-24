import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";

type getAnalysisAnswer = {
  spaceId: string;
  retrospectId: string;
};

export type getAnalysisResponse = {
  hasAIAnalyzed: boolean;
  individuals: {
    name: string;
    answers: {
      answerContent: string;
      questionContent: string;
      questionType: string;
    }[];
  }[];
  questions: {
    questionContent: string;
    questionType: string;
    answers: {
      name: string;
      answerContent: string;
    }[];
  }[];
};

export const useGetAnalysisAnswer = ({ spaceId, retrospectId }: getAnalysisAnswer) => {
  const getAnalysisAnswer = () => {
    const res = api.get<getAnalysisResponse>(`/space/${spaceId}/retrospect/${retrospectId}/answer/analyze`).then((res) => res.data);
    return res;
  };
  return useQuery({
    queryFn: () => getAnalysisAnswer(),
    queryKey: [spaceId, retrospectId, "analysis"],
  });
};
