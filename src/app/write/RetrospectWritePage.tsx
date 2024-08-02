import { createContext, Fragment, useState } from "react";

import data from "./data/checkRetrospect.json";

import { Prepare, Write } from "@/component/write/phase";

export type QuestionData = {
  question: string;
  order: number;
  questionType: string;
  questionId: number;
};

type PhaseContextProps = {
  data: {
    questions: QuestionData[];
  };
  phase: number;
  totalPhase: number;
  movePhase: (phase: number) => void;
  incrementPhase: () => void;
  decrementPhase: () => void;
};
export const AdvanceQuestionsNum = 2;
export const PhaseContext = createContext<PhaseContextProps>({
  data,
  phase: 1,
  totalPhase: 1,
  movePhase: () => {},
  incrementPhase: () => {},
  decrementPhase: () => {},
});
export function RetrospectWritePage() {
  const [phase, setPhase] = useState(-1);
  const questionsData = data;

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
      <PhaseContext.Provider value={{ data: questionsData, phase, totalPhase: 5, movePhase, incrementPhase, decrementPhase }}>
        {phase >= 0 ? <Write /> : <Prepare />}
      </PhaseContext.Provider>
    </Fragment>
  );
}
