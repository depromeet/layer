import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";
import { Answer } from "@/component/write/phase/Write.tsx";

type writeQuestionsProps = {
  data: Answer[];
  spaceId: number;
  retrospectId: number;
  isTemporarySave: boolean;
};

export const useWriteQuestions = () => {
  const writeQuestions = ({ data, isTemporarySave = false, spaceId, retrospectId }: writeQuestionsProps) => {
    const res = api.post(`/space/${spaceId}/retrospect/${retrospectId}/answer`, {
      requests: data,
      isTemporarySave: isTemporarySave,
    });
    return res;
  };

  return useMutation({
    mutationFn: ({ data, isTemporarySave, spaceId, retrospectId }: writeQuestionsProps) =>
      writeQuestions({ data, isTemporarySave, spaceId, retrospectId }),
  });
};
