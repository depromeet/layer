import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  id: string;
};

export const Portal = ({ id, children }: Props) => {
  const el = document.getElementById(`${id}`) as HTMLElement;

  useEffect(() => {
    if (children) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [children]);

  return createPortal(children, el);
};
