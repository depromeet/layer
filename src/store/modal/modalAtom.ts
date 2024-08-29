import { atom } from "jotai";

import { ModalType } from "@/types/modal";

export const modalState = atom<ModalType>({
  isOpen: false,
  title: "",
  contents: "",
  onClose: () => {},
  onConfirm: () => {},
  overrideActionElements: undefined,
  options: {
    type: "confirm",
    buttonText: [],
    autoClose: true,
  },
});
