import { CloseRounded } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";

export const ContainerModal = ({
  children,
  actionButton,
  title,
  open,
  onClose,
  onSubmit,
  maxWidth,
}) => {
  return (
    <Dialog
      component={"form"}
      maxWidth={maxWidth || "md"}
      open={open}
      fullWidth
      onSubmit={onSubmit}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "primary.main",
          color: "#ffffff",
          fontWeight: 600, // Correct weight for semi-bold
        }}
      >
        {title}

        <IconButton onClick={onClose}>
          <CloseRounded style={{ color: "#FFF" }} fontSize="medium" />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {children}
      </DialogContent>

      <DialogActions>{actionButton}</DialogActions>
    </Dialog>
  );
};
