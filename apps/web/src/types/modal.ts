import { ReactNode } from "react";

export type ModalType = {
  isOpen: boolean;
  title: string;
  contents: ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  overrideActionElements?: JSX.Element;
  options?: {
    type?: "confirm" | "alert";
    buttonText?: string[];
    autoClose?: boolean;
  };
};
