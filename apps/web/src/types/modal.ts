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

type FunnelStep = "retrospectCreate" | "template" | "recommendTemplate" | "listTemplate" | "listTemplateDetail";

export type FunnelModalType = {
  isOpen: boolean;
  title: string;
  step: FunnelStep | null;
  contents: ReactNode | string;
  templateTag?: string;
  onClose?: () => void;
  onConfirm?: () => void;
};

export type ActionModalType = {
  isOpen: boolean;
  title: string;
  contents: ReactNode | string;
  onClose?: () => void;
  onConfirm?: () => void;
};
