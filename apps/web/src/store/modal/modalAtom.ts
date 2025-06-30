import { atom } from "jotai";

import { DefaultModalType, ModalType } from "@/types/modal";

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

export const defaultModalState = atom<DefaultModalType>({
  isOpen: false,
  title: "",
  contentsElement: undefined,
  onClose: () => {},
  onConfirm: () => {},
  overrideActionElements: undefined,
  options: {
    type: "confirm",
    buttonText: [],
    autoClose: true,
  },
});
