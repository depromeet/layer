import { createContext, Fragment, useState } from "react";

import { Prepare } from "@/app/write/prepare.tsx";
import { Write } from "@/app/write/write.tsx";

export const PhaseContext = createContext({ phase: 1, totalPhase: 1, incrementPhase: () => {}, decrementPhase: () => {} });
export function Main() {
  const [phase, setPhase] = useState(-1);

  const incrementPhase = () => {
    setPhase((prevPhase) => prevPhase + 1);
  };

  const decrementPhase = () => {
    if (phase >= -1) setPhase((prevPhase) => prevPhase - 1);
  };

  return (
    <Fragment>
      <PhaseContext.Provider value={{ phase, totalPhase: 5, incrementPhase, decrementPhase }}>
        {phase === -1 && <Prepare />}
        {phase >= 0 && <Write />}
      </PhaseContext.Provider>
    </Fragment>
  );
}
