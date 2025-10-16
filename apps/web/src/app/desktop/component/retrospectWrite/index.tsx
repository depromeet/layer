import { useGetQuestions } from "@/hooks/api/write/useGetQuestions";
import { QuestionData } from "@/types/write";

import { createContext, useEffect, useState } from "react";
import { WriteDialog } from "./writeDialog";
import { retrospectWriteAtom } from "@/store/retrospect/retrospectWrite";
import { useAtomValue } from "jotai";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";

export type PhaseContextProps = {
  data: QuestionData;
  phase: number;
  maxPhase: number;
  movePhase: (phase: number) => void;
  incrementPhase: () => void;
  decrementPhase: () => void;
  spaceId: number;
  retrospectId: number;
  title: string;
  introduction: string;
};

export const AdvanceQuestionsNum = 2;
export const PhaseContext = createContext<PhaseContextProps>({
  data: { isTemporarySaved: false, questions: [] },
  phase: 1,
  maxPhase: 1,
  spaceId: -1,
  retrospectId: -1,
  title: "",
  introduction: "",
  movePhase: () => {},
  incrementPhase: () => {},
  decrementPhase: () => {},
});

function adjustOrder(data: QuestionData): QuestionData {
  return {
    ...data,
    questions: data.questions.map((q) => ({
      ...q,
      order: q.order - 1,
    })),
  };
}

function RetrospectWrite() {
  const { spaceId, retrospectId, title, introduction } = useAtomValue(retrospectWriteAtom);
  const [phase, setPhase] = useState(0);
  const { data, isLoading } = useGetQuestions({ spaceId: spaceId, retrospectId: retrospectId });
  const defaultData: QuestionData = { isTemporarySaved: false, questions: [] };
  const [adjustedData, setAdjustedData] = useState<QuestionData>();

  useEffect(() => {
    if (data) {
      setAdjustedData(adjustOrder(data));
    }
  }, [data]);

  const maxPhase = (adjustedData?.questions.length ?? 0) - 1;

  const incrementPhase = () => {
    const maxPhase = (data?.questions.length ?? 0) - 1;
    if (phase < maxPhase) {
      setPhase((prevPhase) => prevPhase + 1);
    }
  };

  const decrementPhase = () => {
    if (phase > 0) setPhase((prevPhase) => prevPhase - 1);
  };

  const movePhase = (phase: number) => {
    setPhase(phase);
  };

  return (
    <>
      {isLoading && <LoadingModal purpose={"회고 작성을 위한 데이터를 가져오고 있어요"} />}
      <PhaseContext.Provider
        value={{
          data: adjustedData ?? defaultData,
          phase,
          maxPhase,
          movePhase,
          incrementPhase,
          decrementPhase,
          spaceId,
          retrospectId,
          title,
          introduction,
        }}
      >
        <WriteDialog />
      </PhaseContext.Provider>
    </>
  );
}

export default RetrospectWrite;
