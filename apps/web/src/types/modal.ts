export type ModalVariant = "small" | "default";

export type ModalType = {
  isOpen: boolean;
  variant?: ModalVariant;
  title: string;
  contents: string;
  contentsElement?: JSX.Element;
  onClose?: () => void;
  onConfirm?: () => void;
  overrideActionElements?: JSX.Element;
  options?: {
    type?: "confirm" | "alert";
    buttonText?: string[];
    autoClose?: boolean;
  };
};
