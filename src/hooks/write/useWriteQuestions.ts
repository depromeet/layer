import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { api } from "@/api";
import { QuestionData } from "@/app/write/RetrospectWritePage.tsx";

type writeQuestionsProps = {
  data: QuestionData[];
  isTemporarySave: boolean;
  spaceId: number;
  retrospectId: number;
};

// type writeQuestionsResponse {
//
// }

export const useWriteQuestions = () => {
  const navigate = useNavigate();
  const writeQuestions = ({ data, isTemporarySave = false, spaceId, retrospectId }: writeQuestionsProps) => {
    const res = api
      .post(`/space/${spaceId}/retrospect/${retrospectId}/answer`, {
        requests: data,
        isTemporarySave: isTemporarySave,
      })
      .then((res) => res.data);
    return res;
  };

  return useMutation({
    mutationFn: ({ data, isTemporarySave, spaceId, retrospectId }: writeQuestionsProps) =>
      writeQuestions({ data, isTemporarySave, spaceId, retrospectId }),
    onSuccess: () =>
      navigate("/write/complete", {
        state: {
          nickname: "김현우",
        },
      }),
  });
};
