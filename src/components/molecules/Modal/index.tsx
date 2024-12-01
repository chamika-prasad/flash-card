import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  style?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  style,
}: IProps) => {

  const modalContent = (
    <div
      className={`modal ${isOpen ? "open" : ""} ${style ? style : ""} `}
      onClick={onClose}
    >
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  return isOpen ? ReactDOM.createPortal(modalContent, document.body) : null;
};