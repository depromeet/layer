import { ReactNode } from "react";

export type ModalType = {
  isOpen: boolean;
  title: string;
  contents: ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  overrideActionElements?: JSX.Element;
  options?: {
    type?: "confirm" | "alert" | "multiStep";
    modalType?: "retrospectCreate" | "retrospectTemplateRecommend" | "retrospectTemplateList";
    buttonText?: string[];
    autoClose?: boolean;
  };
};
