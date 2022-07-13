import React from "react";
import styleModal from "./Modal.module.scss";

const Modal = ({title, open, onClose }) => {
  if (!open) return null;

  return (
    <div onClick={onClose} className={styleModal.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styleModal.container}
      >
        <h3>{title}</h3>
        <button onClick={onClose} className={styleModal.button}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
