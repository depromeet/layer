import { useAtom } from "jotai";
import { useCallback } from "react";

import { modalState } from "@/store/modal/modalAtom";
import { ModalType } from "@/types/modal";

export const useModal = () => {
  const [modalDataState, setModalDataState] = useAtom(modalState);

  const close = useCallback(() => {
    setModalDataState({ ...modalDataState, isOpen: false });
  }, [modalDataState, setModalDataState]);

  const open = useCallback(
    ({ contents, title, onConfirm, onClose, overrideActionElements, options }: Omit<ModalType, "isOpen">) => {
      setModalDataState({
        isOpen: true,
        title,
        contents,
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
