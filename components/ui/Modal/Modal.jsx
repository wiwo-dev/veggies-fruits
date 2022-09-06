import React from "react";
import ModalBackdrop from "./ModalBackdrop";
import ModalContent from "./ModalContent";

function Modal({ children, container, onClose }) {
  return (
    <>
      <ModalBackdrop onClick={onClose} />
      <ModalContent container={container}>{children}</ModalContent>
    </>
  );
}

export default Modal;
