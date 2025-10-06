import { useAtom } from "jotai";
import { useCallback } from "react";
import { ActionModalType } from "@/types/modal";
import { ActionModalState } from "@/store/modal/actionModalAtom";

export const useActionModal = () => {
  const [state, setState] = useAtom(ActionModalState);

  const openActionModal = useCallback(
    ({ title, contents, onConfirm, onClose }: Omit<ActionModalType, "isOpen">) => {
      setState({
        isOpen: true,
        title,
        contents,
        onConfirm,
        onClose,
      });
    },
    [setState],
  );

  const closeActionModal = useCallback(() => {
    setState({
      isOpen: false,
      title: "",
      contents: null,
      onClose: () => {},
      onConfirm: () => {},
    });
  }, [setState]);

  return {
    actionModalState: state,
    openActionModal,
    closeActionModal,
  };
};
