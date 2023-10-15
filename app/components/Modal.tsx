import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ModalInterface } from "../types";
import { Pixelify_Sans } from "next/font/google";

const pixelify = Pixelify_Sans({ subsets: ["latin"] });

export default function BasicModal({ open, setOpen }: ModalInterface) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        className={`${pixelify.className}`}
      >
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
           bg-white border-4 border-zinc-700 shadow-lg p-4 w-7/12 text-xl rounded-md outline-none"
        >
          <Typography id="modal-modal-description" className="text-center">
            Please pick at least 2 and at most 8 ingredients!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
