import React from "react";
import { WarningModalProps } from "../types";
import Modal from "react-bootstrap/Modal";
import "@/app/globals.css";

const WarningModal = ({ onClose }: WarningModalProps) => {
  return (
    <Modal
      show={true}
      onHide={onClose}
      className="border-2 border-zinc-700 rounded-md text-xl text-center font-font-pixelify"
      id="modal-box"
    >
      <Modal.Body
        className="flex flex-col gap-4 font-font-pixelify"
        id="modal-body"
      >
        Pick at least 2 and at most 8 ingredients!
        <button
          className="btn btn-primary border-2 border-black mx-auto font-font-pixelify"
          id="modal-button"
          onClick={onClose}
        >
          OKAY!
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default WarningModal;
