import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeviceType } from "./useDeviceType";

type UseMultiStepForm<T extends string> = {
  steps: readonly T[];
  redirectPath?: string;
};

export const useMultiStepForm = <T extends string>({ steps, redirectPath }: UseMultiStepForm<T>) => {
  const { isMobile } = useDeviceType();
  const navigate = useNavigate();
  const totalStepsCnt = useMemo(() => steps.length, [steps]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep: T = useMemo(() => steps[currentStepIndex], [currentStepIndex, steps]);
  const isLastStep = useMemo(() => currentStepIndex === totalStepsCnt - 1, [currentStepIndex, totalStepsCnt]);

  const goNext = useCallback(() => {
    if (isLastStep) {
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      }
      return;
    }
    setCurrentStepIndex((i) => i + 1);
  }, [currentStep, totalStepsCnt, steps, redirectPath]);

  const goPrev = useCallback(() => {
    if (currentStepIndex === 0 && isMobile) {
      navigate(-1);
      return;
    }
    setCurrentStepIndex((i) => i - 1);
  }, [currentStepIndex]);

  const goTo = useCallback(
    (targetStep: T) => {
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
      isLastStep,
    }),
    [totalStepsCnt, currentStep, currentStepIndex, goNext, goPrev, goTo, isLastStep],
  );
};
