import { ActionModalType } from "@/types/modal";
import { atom } from "jotai";

export const ActionModalState = atom<ActionModalType>({
  isOpen: false,
  title: "",
  contents: "",
  onClose: () => {},
  onConfirm: () => {},
});
