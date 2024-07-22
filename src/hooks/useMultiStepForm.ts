import { useCallback, useMemo, useState } from "react";

type UseMultiStepForm<T extends readonly string[]> = {
  steps: T;
};

export const useMultiStepForm = <T extends readonly string[]>({ steps }: UseMultiStepForm<T>) => {
  const totalStepsCnt = useMemo(() => steps.length, [steps]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep: T[number] = useMemo(() => steps[currentStepIndex], [currentStepIndex, steps]);

  const goNext = useCallback(
    (callback?: (args?: T) => void) => {
      if (currentStepIndex === totalStepsCnt) {
        return;
      }
      setCurrentStepIndex((i) => i + 1);
      if (callback) {
        callback();
      }
    },
    [currentStepIndex, totalStepsCnt],
  );

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
      currentStepNumber: currentStepIndex + 1,
      goNext,
      goPrev,
    }),
    [totalStepsCnt, currentStep, currentStepIndex, goNext, goPrev],
  );
};
