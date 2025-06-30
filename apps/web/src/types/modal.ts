export type ModalVariant = "small" | "default";

type BaseModalType = {
  isOpen: boolean;
  title: string;
  onClose?: () => void;
  onConfirm?: () => void;
  overrideActionElements?: JSX.Element;
  options?: {
    type?: "confirm" | "alert";
    buttonText?: string[];
    autoClose?: boolean;
  };
};

export interface ModalType extends BaseModalType {
  contents: string;
}

export interface DefaultModalType extends BaseModalType {
  contentsElement: JSX.Element | undefined;
}
