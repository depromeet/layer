import { useCallback, useMemo, useState } from "react";

type UseMultiStepForm<T extends readonly string[]> = {
  stepNames: T;
};

export const useMultiStepForm = <T extends readonly string[]>({ stepNames }: UseMultiStepForm<T>) => {
  const totalStepsCnt = useMemo(() => stepNames.length, [stepNames]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep: T[number] = useMemo(() => stepNames[currentStepIndex], [currentStepIndex, stepNames]);

  const goNext = useCallback(() => {
    if (currentStepIndex === totalStepsCnt) {
      return;
    }
    setCurrentStepIndex((i) => i + 1);
  }, [currentStepIndex, totalStepsCnt]);

  const goPrev = useCallback(() => {
    if (currentStepIndex === 0) {
      return;
    }
    setCurrentStepIndex((i) => i - 1);
  }, [currentStepIndex]);

  return useMemo(
    () => ({
      totalStepsCnt,
      currentStep,
      goNext,
      goPrev,
    }),
    [totalStepsCnt, currentStep, goNext, goPrev],
  );
};
