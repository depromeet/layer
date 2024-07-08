import { ReactNode } from "react";
import ReactDom from "react-dom";

type Props = {
  children: ReactNode;
};

const ModalPortal = ({ children }: Props) => {
  const el = document.getElementById("modal-root") as HTMLElement;
  return ReactDom.createPortal(children, el);
};

export default ModalPortal;
