import { useAtom } from "jotai";
import { useCallback } from "react";

import { defaultModalState } from "@/store/modal/modalAtom";
import { DefaultModalType } from "@/types/modal";

export const useDefaultModal = () => {
  const [modalDataState, setModalDataState] = useAtom(defaultModalState);

  const close = useCallback(() => {
    setModalDataState({ ...modalDataState, isOpen: false });
  }, [modalDataState, setModalDataState]);

  const open = useCallback(
    ({ title, contentsElement, onConfirm, onClose, overrideActionElements, options }: Omit<DefaultModalType, "isOpen">) => {
      setModalDataState({
        isOpen: true,
        title,
        contentsElement,
        onConfirm,
        onClose,
        overrideActionElements,
        options: {
          ...(modalDataState.options || {}),
          ...options,
        },
      });
    },
    [setModalDataState],
  );

  return {
    open,
    close,
    modalDataState,
  };
};
