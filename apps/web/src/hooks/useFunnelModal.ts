// hooks/useFunnelModal.ts
import { useAtom } from "jotai";
import { useCallback } from "react";
import { funnelModalState } from "@/store/modal/funnelModalAtom";

type FunnelStep = "retrospectCreate" | "template" | "analysis" | null;

export const useFunnelModal = () => {
  const [state, setState] = useAtom(funnelModalState);

  const openFunnelModal = useCallback(
    (step: FunnelStep) => {
      setState({ isOpen: true, currentStep: step });
    },
    [setState],
  );

  const closeFunnelModal = useCallback(() => {
    setState({ isOpen: false, currentStep: null });
  }, [setState]);

  const setFunnelStep = useCallback(
    (step: FunnelStep) => {
      setState((prev) => ({ ...prev, currentStep: step }));
    },
    [setState],
  );

  return {
    funnelModalState: state,
    openFunnelModal,
    closeFunnelModal,
    setFunnelStep,
  };
};
