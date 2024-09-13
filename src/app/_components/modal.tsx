import React, { ComponentProps, ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

type ModalHeaderProps = {
  children: ReactNode;
};

type ModalBodyProps = {
  children: ReactNode;
};

type ModalFooterProps = {
  children: ReactNode;
};

type ModalButtonProps = ComponentProps<typeof Button> & {};

export const ModalHeader = ({ children }: ModalHeaderProps) => (
  <h3 className="text-xl font-bold text-slate-800 mb-6">{children}</h3>
);

export const ModalBody = ({ children }: ModalBodyProps) => (
  <p className="my-6">{children}</p>
);

export const ModalFooter = ({ children }: ModalFooterProps) => (
  <div className="flex w-full mt-6">{children}</div>
);

export const ButtonClose = (props: ModalButtonProps) => (
  <Button {...props} className="bg-fgPrimary text-white w-fit px-9 flex-0">
    {props.children}
  </Button>
);

export const ButtonDanger = (props: ModalButtonProps) => (
  <Button {...props} className={"bg-danger text-white w-fit px-9 flex-0"}>
    {props.children}
  </Button>
);

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-7 rounded-md max-w-[410px] w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
