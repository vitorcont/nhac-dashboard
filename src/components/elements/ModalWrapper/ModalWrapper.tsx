"use client";

import { Modal } from "@mui/material";
import React from "react";

export interface ModalWrapperProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const ModalWrapper = (props: ModalWrapperProps) => (
  <Modal
    open={props.open}
    className="modal-wrapper"
    onClose={() => {
      props.setOpen(false);
      if (props.onClose) {
        props.onClose();
      }
    }}>
    <div className="modal-wrapper__inside-card">{props.children}</div>
  </Modal>
);
