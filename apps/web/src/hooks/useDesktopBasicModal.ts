import { useAtom } from "jotai";
import { useCallback } from "react";

import { ModalType } from "@/types/modal";
import { desktopBasicModalState } from "@/store/modal/desktopBasicModalAtom";

export default function useDesktopBasicModal() {
  const [modalDataState, setModalDataState] = useAtom(desktopBasicModalState);

  const close = useCallback(() => {
    setModalDataState({
      ...modalDataState,
      isOpen: false,
      options: {
        type: "confirm",
        buttonText: [],
        autoClose: true,
        enableFooter: true,
      },
    });
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
}
