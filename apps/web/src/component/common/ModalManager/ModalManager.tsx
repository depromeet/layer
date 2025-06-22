import { Modal } from "../Modal/Modal";
import { useModal } from "@/hooks/useModal";

import DefaultModal from "../Modal/DefaultModal/DefaultModal";

export function ModalManager() {
  const {
    modalDataState: { variant },
  } = useModal();

  if (variant === "default") {
    return <DefaultModal />;
  }

  return <Modal />;
}
