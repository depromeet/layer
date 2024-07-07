import { ModalType } from "@/types/modal";
import { atom } from "jotai";

export const modalState = atom<ModalType>({
  isOpen: false,
  title: "",
  content: "",
});
