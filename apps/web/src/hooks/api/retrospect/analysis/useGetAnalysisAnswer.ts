import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { ACHIVEMENT_PERCENT } from "@/component/write/template/write/write.const.ts";

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
      answerContent: answer.questionType === "range" ? calculateScaledAnswer(answer.answerContent, ACHIVEMENT_PERCENT[0]) : answer.answerContent,
    })),
  }));

  const transformedQuestions = data.questions.map((question) => ({
    ...question,
    answers: question.answers.map((answer) => ({
      ...answer,
      answerContent: question.questionType === "range" ? calculateScaledAnswer(answer.answerContent, ACHIVEMENT_PERCENT[0]) : answer.answerContent,
    })),
  }));

  return {
    ...data,
    individuals: transformedIndividuals,
    questions: transformedQuestions,
  };
};

function calculateScaledAnswer(answerContent: string, achievementPercent: string): number {
  const parsedAnswer = parseFloat(answerContent);
  const parsedPercent = parseFloat(achievementPercent);

  if (isNaN(parsedAnswer) || isNaN(parsedPercent) || parsedPercent === 0) {
    return -1;
  }

  return parsedAnswer / parsedPercent - 1;
}

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
  });
};
