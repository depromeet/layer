import { useAtom } from "jotai";
import { useCallback } from "react";
import { FunnelModalType } from "@/types/modal";
import { FunnelModalState } from "@/store/modal/funnelModalAtom";

export const useFunnelModal = () => {
  const [state, setState] = useAtom(FunnelModalState);

  const openFunnelModal = useCallback(
    ({ title, step, contents, onConfirm, onClose }: Omit<FunnelModalType, "isOpen">) => {
      setState({
        isOpen: true,
        title,
        step,
        contents,
        onConfirm,
        onClose,
      });
    },
    [setState],
  );

  const closeFunnelModal = useCallback(() => {
    setState({
      isOpen: false,
      title: "",
      step: "",
      contents: null,
      onClose: () => {},
      onConfirm: () => {},
    });
  }, [setState]);

  return {
    funnelModalState: state,
    openFunnelModal,
    closeFunnelModal,
  };
};
