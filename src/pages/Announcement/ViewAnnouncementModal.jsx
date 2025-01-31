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

function ViewAnnouncementModal({
  open,
  onSubmit,
  onClose,
  disabled,
  setFormData,
  formData,
  editMode,
  setEditMode,
  handleDeleteClick,
}) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Dialog open={open} maxWidth="md" component={"form"}>
      <DialogTitle
        variant="h6"
        fontWeight="500"
        sx={{ bgcolor: "primary.main" }}
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        Announcement
        <IconButton onClick={onClose}>
          <Close sx={{ color: "#FFF" }} />
        </IconButton>
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
            slotProps={{
              input: {
                readOnly: !editMode,
              },
            }}
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
            slotProps={{
              input: {
                readOnly: !editMode,
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions component={"span"}>
        {editMode ? (
          <>
            <Button
              disabled={disabled}
              variant="outlined"
              size="small"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={disabled}
              variant="contained"
              size="small"
              color={"primary"}
              onClick={onSubmit}
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
        ) : (
          <>
            <Button
              disabled={disabled}
              variant="contained"
              size="small"
              color="error"
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
            <Button
              disabled={disabled}
              variant="contained"
              size="small"
              color={"primary"}
              onClick={() => setEditMode(true)}
              type="button"
            >
              Edit
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ViewAnnouncementModal;
