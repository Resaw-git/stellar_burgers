import React, {FC} from "react";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IComponentProps {
  children: React.ReactNode
  onClose: () => void
}

const Modal: FC<IComponentProps> = ({ children, onClose }) => {
  const escapeModal = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", escapeModal);
    return () => {
      document.removeEventListener("keydown", escapeModal);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <div className={styles.cross}>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
    </>,
    document.getElementById("react-modal") as HTMLElement
  );
};

export default Modal;
