import { useCallback, useMemo, useState } from "react";

type UseMultiStepForm<T extends readonly string[]> = {
  stepNames: T;
};

export const useMultiStepForm = <T extends readonly string[]>({ stepNames }: UseMultiStepForm<T>) => {
  const totalStepsCnt = useMemo(() => stepNames.length, [stepNames]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep: T[number] = useMemo(() => stepNames[currentStepIndex], [currentStepIndex]);

  const goNext = useCallback(() => {
    if (currentStepIndex === totalStepsCnt) {
      return;
    }
    setCurrentStepIndex((i) => i + 1);
  }, []);

  const goPrev = useCallback(() => {
    if (currentStepIndex === 0) {
      return;
    }
    setCurrentStepIndex((i) => i - 1);
  }, []);

  return {
    totalStepsCnt,
    currentStep,
    goNext,
    goPrev,
  };
};
