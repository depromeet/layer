import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { useGetQuestions } from "@/hooks/api/write/useGetQuestions";
import { QuestionData } from "@/types/write";

import { createContext, useEffect, useState } from "react";
import { Prepare } from "./prepare";
import { Write } from "./write";

export type PhaseContextProps = {
  data: QuestionData;
  phase: number;
  movePhase: (phase: number) => void;
  incrementPhase: () => void;
  decrementPhase: () => void;
  spaceId: number;
  retrospectId: number;
  title: string;
  introduction: string;
};

export const PhaseContext = createContext<PhaseContextProps>({
  data: { isTemporarySaved: false, questions: [] },
  phase: 1,
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

interface RetrospectWriteProps {
  spaceId: number;
  retrospectId: number;
  title: string;
  introduction: string;
}

function RetrospectWrite({ spaceId, retrospectId, title, introduction }: RetrospectWriteProps) {
  const [phase, setPhase] = useState(-1);
  const { data, isLoading } = useGetQuestions({ spaceId: spaceId, retrospectId: retrospectId });
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
    <>
      {isLoading && <LoadingModal purpose={"회고 작성을 위한 데이터를 가져오고 있어요"} />}
      <PhaseContext.Provider
        value={{ data: adjustedData ?? defaultData, phase, movePhase, incrementPhase, decrementPhase, spaceId, retrospectId, title, introduction }}
      >
        {phase >= 0 ? <Write /> : <Prepare />}
      </PhaseContext.Provider>
    </>
  );
}

export default RetrospectWrite;
