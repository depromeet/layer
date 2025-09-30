import { ReactNode } from "react";

export type ModalType = {
  isOpen: boolean;
  title: string;
  contents: ReactNode | string;
  onClose?: () => void;
  onConfirm?: () => void;
  overrideActionElements?: JSX.Element;
  options?: {
    type?: "confirm" | "alert";
    buttonText?: string[];
    autoClose?: boolean;
  };
};

export type FunnelModalType = {
  isOpen: boolean;
  title: string;
  step: string;
  contents: ReactNode | string;
  onClose?: () => void;
  onConfirm?: () => void;
};
