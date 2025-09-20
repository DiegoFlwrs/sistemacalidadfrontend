import { Modal, Box, IconButton } from "@mui/material";
import { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ModalComponentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
  width?: number;
}

export const ModalComponent = ({
  open,
  setOpen,
  children,
  width = 400,
}: ModalComponentProps) => {
  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
    outline: "none", 
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={modalStyle}>
        <div className="flex justify-end mb-2">
          <IconButton 
            onClick={() => setOpen(false)} 
            size="small"
            sx={{
              color: "black",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              }
            }}
          >
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </div>
        {children}
      </Box>
    </Modal>
  );
};