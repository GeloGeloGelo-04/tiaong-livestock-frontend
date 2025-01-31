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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";

function ApprovalModal({
  open,
  onClose,
  disabled,
  handleSubmit,
  approvalFormData,
  setApprovalFormData,
  onSubmit,
}) {
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
        Farmers Approval Form
      </DialogTitle>
      <DialogContent dividers>
        <Stack gap={2} sx={{ minWidth: 300 }}>
          {/* <TextField
            label="Type of Farm(CM, SC, SH)"
            variant="outlined"
            fullWidth
            name="typeofFarm"
            value={approvalFormData?.typeofFarm}
            onChange={(e) =>
              setApprovalFormData((prev) => ({
                ...prev,
                typeofFarm: e.target.value,
              }))
            }
            required
            disabled={disabled}
          /> */}

          <FormControl fullWidth disabled={disabled} required>
            <InputLabel>Type of Farm</InputLabel>
            <Select
              name="typeofFarm"
              value={approvalFormData?.typeofFarm}
              label="Type of Farm"
              onChange={(e) =>
                setApprovalFormData((prev) => ({
                  ...prev,
                  typeofFarm: e.target.value,
                }))
              }
            >
              <MenuItem value="CM">CM</MenuItem>
              <MenuItem value="SC">SC</MenuItem>
              <MenuItem value="SH">SH</MenuItem>
            </Select>
          </FormControl>

          {/* <TextField
            disabled={disabled}
            required
            label="RSBSA Registered"
            variant="outlined"
            fullWidth
            name="rsbsaRegistered"
            value={approvalFormData?.rsbsaRegistered}
            onChange={(e) =>
              setApprovalFormData((prev) => ({
                ...prev,
                rsbsaRegistered: e.target.value,
              }))
            }
          /> */}

          <FormControl fullWidth disabled={disabled} required>
            <InputLabel>RSBSA Registered</InputLabel>
            <Select
              name="rsbsaRegistered"
              value={approvalFormData?.rsbsaRegistered}
              label="RSBSA Registered"
              onChange={(e) =>
                setApprovalFormData((prev) => ({
                  ...prev,
                  rsbsaRegistered: e.target.value,
                }))
              }
            >
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
          <TextField
            disabled={disabled}
            required
            label="RSBSA Control No."
            variant="outlined"
            fullWidth
            name="referenceNo"
            value={approvalFormData?.referenceNo}
            onChange={(e) =>
              setApprovalFormData((prev) => ({
                ...prev,
                referenceNo: e.target.value,
              }))
            }
          />
          {/* <TextField
            disabled={disabled}
            required
            label="Biosecurity Level (0,1,2)"
            variant="outlined"
            fullWidth
            name="bioSecLvl"
            value={approvalFormData?.bioSecLvl}
            onChange={(e) =>
              setApprovalFormData((prev) => ({
                ...prev,
                bioSecLvl: e.target.value,
              }))
            }
          /> */}

          <FormControl fullWidth disabled={disabled} required>
            <InputLabel>Biosecurity Level</InputLabel>
            <Select
              name="bioSecLvl"
              value={approvalFormData?.bioSecLvl}
              label="Biosecurity Level"
              onChange={(e) =>
                setApprovalFormData((prev) => ({
                  ...prev,
                  bioSecLvl: e.target.value,
                }))
              }
            >
              <MenuItem value="0">0</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </Select>
          </FormControl>
        </Stack>
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
            onClick={handleSubmit}
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

export default ApprovalModal;
