import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";
import { Answer } from "@/component/write/phase/Write.tsx";

type writeQuestionsProps = {
  data: Answer[];
  spaceId: number;
  retrospectId: number;
  isTemporarySave: boolean;
  method?: string;
};

export const useWriteQuestions = () => {
  const writeQuestions = ({ data, isTemporarySave = false, spaceId, retrospectId, method = "POST" }: writeQuestionsProps) => {
    const url = `/space/${spaceId}/retrospect/${retrospectId}/answer`;
    const payload = { requests: data, ...(method === "POST" && { isTemporarySave }) };

    if (method === "POST") {
      return api.post(url, payload);
    } else {
      return api.put(url, payload);
    }
  };

  return useMutation({
    mutationFn: ({ data, isTemporarySave, spaceId, retrospectId, method }: writeQuestionsProps) =>
      writeQuestions({ data, isTemporarySave, spaceId, retrospectId, method }),
  });
};
