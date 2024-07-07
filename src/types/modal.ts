export type ModalType = {
  isOpen: boolean;
  title: string;
  content: JSX.Element | string;
  callBack?: () => any;
};
