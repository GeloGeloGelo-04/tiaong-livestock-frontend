import { Alert, Snackbar } from "@mui/material";
import React, { useEffect } from "react";

const SnackBar = ({ open, onClose, severity, msg, position }) => {
  return (
    <Snackbar
      autoHideDuration={3000} // Adjust as needed
      open={open}
      anchorOrigin={position || { horizontal: "right", vertical: "bottom" }}
      onClose={() => onClose(false)}
    >
      <Alert
        onClose={() => onClose(false)}
        severity={severity || "success"}
        variant="filled"
        icon={false}
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
