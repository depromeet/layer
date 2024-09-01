import { useMutation } from "@tanstack/react-query";

import { api } from "@/api";
import { Answer } from "@/component/write/phase/Write.tsx";
import { ACHIVEMENT_PERCENT } from "@/component/write/template/write/write.const.ts";

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
    /**
     * NOTE: 분석을 위한 Range 값을 실제 퍼센트로 변환하는 작업을 진행합니다.
     * index 형태를 통해 게이지를 채우기 때문에 index는 0으로 시작하는 형태를 지니고 있습니다,
     * 그렇기 때문에 퍼센테이저로 변환하는 수식을 (index + 1) * 20로 설정을 합니다.
     *
     * Achievement Percent
     * - 0 : 20
     * - 1 : 40
     * - 2 : 60
     * - 3 : 80
     * - 4 : 100
     * */
    const scaledAchievement = data.map((curData) =>
      curData.questionType === "range" ? { ...curData, answerContent: ACHIVEMENT_PERCENT[parseInt(curData.answerContent)] ?? "-1" } : curData,
    );
    const payload = { requests: scaledAchievement, ...(method === "POST" && { isTemporarySave }) };

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
