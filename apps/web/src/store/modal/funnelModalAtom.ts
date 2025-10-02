import { FunnelModalType } from "@/types/modal";
import { atom } from "jotai";

export const FunnelModalState = atom<FunnelModalType>({
  isOpen: false,
  title: "",
  step: null,
  contents: "",
  onClose: () => {},
  onConfirm: () => {},
});
