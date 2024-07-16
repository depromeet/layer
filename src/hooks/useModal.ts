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
    ({ content, title, callBack }: Omit<ModalType, "isOpen">) => {
      setModalDataState({
        isOpen: true,
        title,
        content,
        callBack,
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
