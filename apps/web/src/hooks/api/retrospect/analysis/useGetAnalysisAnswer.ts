import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { ACHIVEMENT_PERCENT } from "@/component/write/template/write/write.const.ts";
import { calculateScaledAnswer } from "@/utils/answer/calculateScaledAnswer.ts";

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

const scaledAchievement = (data: getAnalysisResponse) => {
  const transformedIndividuals = data.individuals.map((individual) => ({
    ...individual,
    answers: individual.answers.map((answer) => ({
      ...answer,
      answerContent:
        answer.questionType === "range" ? calculateScaledAnswer(answer.answerContent, ACHIVEMENT_PERCENT[0]).toString() : answer.answerContent,
    })),
  }));

  const transformedQuestions = data.questions.map((question) => ({
    ...question,
    answers: question.answers.map((answer) => ({
      ...answer,
      answerContent:
        question.questionType === "range" ? calculateScaledAnswer(answer.answerContent, ACHIVEMENT_PERCENT[0]).toString() : answer.answerContent,
    })),
  }));

  return {
    ...data,
    individuals: transformedIndividuals,
    questions: transformedQuestions,
  };
};

export const useGetAnalysisAnswer = ({ spaceId, retrospectId }: getAnalysisAnswer) => {
  const getAnalysisAnswer = () => {
    const res = api
      .get<getAnalysisResponse>(`/space/${spaceId}/retrospect/${retrospectId}/answer/analyze`)
      .then((res) => scaledAchievement(res.data));
    return res;
  };
  return useQuery({
    queryFn: () => getAnalysisAnswer(),
    queryKey: [spaceId, retrospectId, "analysis"],
    retry: 1,
  });
};
