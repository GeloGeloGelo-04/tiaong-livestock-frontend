import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function AddAnnouncementModal({
  open,
  onSubmit,
  onClose,
  disabled,
  setFormData,
  formData,
}) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Dialog
      open={open}
      maxWidth="md"
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <DialogTitle
        variant="h6"
        fontWeight="500"
        sx={{ bgcolor: "primary.main" }}
        color="white"
      >
        Add Announcement
      </DialogTitle>
      <DialogContent>
        <Box
          py={2}
          px={0}
          display="flex"
          flexDirection="column"
          gap={2}
          minWidth={500}
        >
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            placeholder="Announcement Title"
            required
            disabled={disabled}
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            placeholder="Enter your message for farmers..."
            required
            disabled={disabled}
            multiline
            rows={10}
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions component={"span"}>
        <>
          <Button
            disabled={disabled}
            variant="outlined"
            size="small"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={disabled}
            variant="contained"
            size="small"
            color={"primary"}
          >
            {disabled ? (
              <Box display="flex" alignItems="center" gap={2}>
                <CircularProgress size={18} color="inherit" />
                <span>Loading...</span>
              </Box>
            ) : (
              <span>submit</span>
            )}
          </Button>
        </>
      </DialogActions>
    </Dialog>
  );
}

export default AddAnnouncementModal;
