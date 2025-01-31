import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Stack,
  Collapse,
  TextField,
  FormGroup,
} from "@mui/material";
import React from "react";

function RejectionModal({
  open,
  onClose,
  handleCheckboxChange,
  rejectionReason,
  disabled,
  setRejectReason,
  handleRejectSubmit,
}) {
  return (
    <Dialog open={open} maxWidth="md">
      <DialogTitle
        variant="h6"
        fontWeight="500"
        sx={{ bgcolor: "primary.main" }}
        color="white"
      >
        Reason of Rejection
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          <FormGroup>
            <Stack minWidth={400}>
              <FormControlLabel
                control={<Checkbox />}
                label="Incomplete Application"
                checked={rejectionReason.incomplete}
                name="incomplete"
                onChange={handleCheckboxChange}
                disabled={disabled}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Invalid or Missing ID"
                checked={rejectionReason.invalidID}
                name="invalidID"
                onChange={handleCheckboxChange}
                disabled={disabled}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Not Eligible (non-farmer)"
                checked={rejectionReason.notEligible}
                name="notEligible"
                onChange={handleCheckboxChange}
                disabled={disabled}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Duplicate Application"
                checked={rejectionReason.duplicate}
                name="duplicate"
                onChange={handleCheckboxChange}
                disabled={disabled}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="False Information"
                checked={rejectionReason.falseInfo}
                name="falseInfo"
                onChange={handleCheckboxChange}
                disabled={disabled}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Missing Documents"
                checked={rejectionReason.missingDoc}
                name="missingDoc"
                onChange={handleCheckboxChange}
                disabled={disabled}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Other, Specify:"
                checked={rejectionReason.others}
                name="others"
                onChange={handleCheckboxChange}
                disabled={disabled}
              />

              <Collapse in={rejectionReason.others}>
                <TextField
                  disabled={disabled}
                  fullWidth
                  placeholder="Specify here"
                  value={rejectionReason.specify}
                  onChange={(e) =>
                    setRejectReason((prev) => ({
                      ...prev,
                      specify: e.target.value,
                    }))
                  }
                />
              </Collapse>
            </Stack>
          </FormGroup>
        </DialogContentText>
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
            disabled={disabled}
            variant="contained"
            size="small"
            color={"primary"}
            onClick={handleRejectSubmit}
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

export default RejectionModal;
