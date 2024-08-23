import React, { useEffect, useCallback } from "react";
import css from "./Modal.module.css";

const Modal = ({ children, onClose, showModal }) => {
  const handlerClick = useCallback(
    (e) => {
      if (e.code === "Escape") onClose();
      if (e.currentTarget === e.target) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handlerClick);

    return () => {
      document.removeEventListener("keydown", handlerClick);
    };
  }, [handlerClick]);

  return (
    <div
      className={
        showModal ? css.backdrop + " " + css.backdropActive : css.backdrop
      }
      onClick={handlerClick}
    >
      <div
        className={
          showModal
            ? css.modalContent + " " + css.modalContentActive
            : css.modalContent
        }
      >
        <button className={css.button} onClick={() => onClose()}></button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
