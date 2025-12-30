import { useAtom } from "jotai";

import { modalState } from "@/store/modal/modalAtom";
import { ModalType } from "@/types/modal";

export const useModal = () => {
  const [modalDataState, setModalDataState] = useAtom(modalState);

  const close = () => {
    setModalDataState({ ...modalDataState, isOpen: false });
  };

  const open = ({ contents, title, onConfirm, onClose, overrideActionElements, options }: Omit<ModalType, "isOpen">) => {
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
  };

  const setProgress = (state: boolean) => {
    setModalDataState((prev) => ({
      ...prev,
      isProgress: state,
    }));
  };

  return {
    open,
    close,
    setProgress,
    modalDataState,
  };
};
