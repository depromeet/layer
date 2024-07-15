import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  id: string;
};

export const Portal = ({ id, children }: Props) => {
  const el = document.getElementById(`${id}`) as HTMLElement;
  return createPortal(children, el);
};
