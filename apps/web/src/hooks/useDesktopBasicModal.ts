import { useAtom } from "jotai";
import { useCallback } from "react";

import { ModalType } from "@/types/modal";
import { desktopBasicModalState } from "@/store/modal/desktopBasicModalAtom";

export default function useDesktopBasicModal() {
  const [modalDataState, setModalDataState] = useAtom(desktopBasicModalState);

  const close = useCallback(() => {
    setModalDataState((prev) => ({
      ...prev,
      isOpen: false,
      options: {
        type: "confirm",
        buttonText: [],
        autoClose: true,
        enableFooter: true,
        needsBackButton: false,
        disabledClose: false,
        backButtonCallback: undefined,
        footerLeftCallback: undefined,
      },
    }));
  }, [setModalDataState]);

  const open = useCallback(
    ({ contents, title, onConfirm, onClose, overrideActionElements, options }: Omit<ModalType, "isOpen">) => {
      setModalDataState((prev) => ({
        isOpen: true,
        title,
        contents,
        onConfirm,
        onClose,
        overrideActionElements,
        options: {
          ...(prev.options || {}),
          ...options,
        },
      }));
    },
    [setModalDataState],
  );

  const updateState = useCallback(
    (states: Partial<ModalType>) => {
      const { options: updatedOptions, ...updatedState } = states;

      setModalDataState((prev) => ({
        ...prev,
        ...updatedState,
        options: {
          ...prev.options,
          ...updatedOptions,
        },
      }));
    },
    [setModalDataState],
  );

  return {
    open,
    close,
    updateState,
    modalDataState,
  };
}
