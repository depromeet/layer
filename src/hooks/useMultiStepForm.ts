import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type UseMultiStepForm<T extends readonly string[]> = {
  steps: T;
  redirectPath?: string;
};

export const useMultiStepForm = <T extends readonly string[]>({ steps, redirectPath }: UseMultiStepForm<T>) => {
  const navigate = useNavigate();
  const totalStepsCnt = useMemo(() => steps.length, [steps]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep: T[number] = useMemo(() => steps[currentStepIndex], [currentStepIndex, steps]);

  console.log("currentStepIndex", currentStepIndex, "totalStepsCnt", totalStepsCnt);
  const goNext = useCallback(() => {
    if (currentStep === steps[totalStepsCnt - 1]) {
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      }
      return;
    }
    setCurrentStepIndex((i) => i + 1);
  }, [currentStep, totalStepsCnt, steps, redirectPath]);

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
      currentStepIndex,
      goNext,
      goPrev,
    }),
    [totalStepsCnt, currentStep, currentStepIndex, goNext, goPrev],
  );
};
