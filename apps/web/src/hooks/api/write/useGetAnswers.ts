import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { ACHIVEMENT_PERCENT } from "@/component/write/template/write/write.const.ts";
import { calculateScaledAnswer } from "@/utils/answer/calculateScaledAnswer.ts";

export type AnswerResponseType = {
  answers: {
    questionId: number;
    questionType: string;
    answerContent: string;
  }[];
};

export const scaledAchievement = (data: AnswerResponseType) => {
  const answers = data.answers.map((item) =>
    item.questionType === "range"
      ? {
          ...item,
          answerContent: calculateScaledAnswer(item.answerContent, ACHIVEMENT_PERCENT[0]).toString(),
        }
      : item,
  );
  return { answers: answers };
};

export const useGetAnswers = ({ spaceId, retrospectId }: { spaceId: number; retrospectId: number }) => {
  const getQuestions = () => {
    const res = api
      .get<AnswerResponseType>(
        `/space/${spaceId}/retrospect/${retrospectId}/answer/written
`,
      )
      .then((res) => scaledAchievement(res.data));
    return res;
  };

  return useQuery({
    queryKey: ["answers", spaceId, retrospectId],
    queryFn: () => getQuestions(),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
