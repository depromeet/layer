import { createContext, Fragment, useEffect, useState } from "react";

import { LoadingModal } from "@/component/common/Modal/LoadingModal.tsx";
import { Prepare, Write } from "@/component/write/phase";
import { useGetQuestions } from "@/hooks/write/useGetQuestions.ts";
import { RetrospectType } from "@/types/write";

export type QuestionData = {
  isTemporarySaved: boolean;
  questions: {
    order: number;
    question: string;
    questionId: number;
    questionType: RetrospectType;
  }[];
};

type PhaseContextProps = {
  data: QuestionData;
  phase: number;
  totalPhase: number;
  movePhase: (phase: number) => void;
  incrementPhase: () => void;
  decrementPhase: () => void;
};

export const AdvanceQuestionsNum = 2;
export const PhaseContext = createContext<PhaseContextProps>({
  data: { isTemporarySaved: false, questions: [] },
  phase: 1,
  totalPhase: 1,
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

export function RetrospectWritePage() {
  const [phase, setPhase] = useState(-1);
  const { data, isLoading } = useGetQuestions({ spaceId: 184, retrospectId: 16 });
  const defaultData: QuestionData = { isTemporarySaved: false, questions: [] };
  const [adjustedData, setAdjustedData] = useState<QuestionData>();

  useEffect(() => {
    if (data) {
      setAdjustedData(adjustOrder(data));
    }
  }, [data]);
  const incrementPhase = () => {
    setPhase((prevPhase) => prevPhase + 1);
  };

  const decrementPhase = () => {
    if (phase >= -1) setPhase((prevPhase) => prevPhase - 1);
  };

  const movePhase = (phase: number) => {
    setPhase(phase);
  };

  return (
    <Fragment>
      {isLoading && <LoadingModal purpose={"회고 작성을 위한 데이터를 가져오고 있어요"} />}
      <PhaseContext.Provider value={{ data: adjustedData ?? defaultData, phase, totalPhase: 5, movePhase, incrementPhase, decrementPhase }}>
        {phase >= 0 ? <Write /> : <Prepare />}
      </PhaseContext.Provider>
    </Fragment>
  );
}
