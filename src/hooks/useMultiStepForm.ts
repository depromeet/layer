import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type UseMultiStepForm<T extends readonly string[]> = {
  steps: T;
  redirectPath?: string;
  handleSubmit?: () => void;
};

export const useMultiStepForm = <T extends readonly string[]>({ steps, redirectPath, handleSubmit }: UseMultiStepForm<T>) => {
  const navigate = useNavigate();
  const totalStepsCnt = useMemo(() => steps.length, [steps]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep: T[number] = useMemo(() => steps[currentStepIndex], [currentStepIndex, steps]);

  const goNext = useCallback(() => {
    if (currentStep === steps[totalStepsCnt - 1]) {
      if (handleSubmit) {
        handleSubmit();
      }
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      }
      return;
    }
    setCurrentStepIndex((i) => i + 1);
  }, [currentStep, totalStepsCnt, steps, redirectPath, handleSubmit]);

  const goPrev = useCallback(() => {
    if (currentStepIndex === 0) {
      return;
    }
    setCurrentStepIndex((i) => i - 1);
  }, [currentStepIndex]);

  const goTo = useCallback(
    (targetStep: T[number]) => {
      const targetIndex = steps.indexOf(targetStep);
      setCurrentStepIndex(targetIndex);
    },
    [steps, setCurrentStepIndex],
  );

  return useMemo(
    () => ({
      totalStepsCnt,
      currentStep,
      currentStepIndex,
      goNext,
      goPrev,
      goTo,
    }),
    [totalStepsCnt, currentStep, currentStepIndex, goNext, goPrev, goTo],
  );
};
