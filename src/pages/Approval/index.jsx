import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableToolbar } from "../../components/form/table/TableToolbar";
import TableFilterBtn from "../../components/form/table/TableFilterBtn";
import TableQuickFilter from "../../components/form/table/TableQuickFilter";
import {
  APPROVAL_TABLE_COLUMN,
  DATA_GRID_STYLE,
  FARMERS_TABLE_COLUMN,
} from "../../utils/constant";
import useData from "../../hooks/useData";
import { Button, Stack } from "@mui/material";
import InfoModal from "./InfoModal";
import ConfirmationDialog from "../../components/shared/ConfirmationDialog";
import RejectionModal from "./RejectionModal";
import axios from "../../api/axios";
import { useQueryClient } from "react-query";
import SnackBar from "../../components/shared/SnackBar";
import ApprovalModal from "./ApprovalModal";
const REJECTION_INITIAL_DATA = {
  incomplete: false,
  invalidID: false,
  notEligible: false,
  duplicate: false,
  falseInfo: false,
  missingDoc: false,
  others: false,
  specify: "",
};
const APPROVAL_INITIAL_DATA = {
  typeofFarm: "",
  rsbsaRegistered: "",
  referenceNo: "",
  bioSecLvl: "",
};
const Approval = () => {
  const queryClient = useQueryClient();
  const { approvalData, approvalDataLoading } = useData();
  const [selectedRow, setSelectedRow] = useState({});
  const [infoOpen, setInfoOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [formMsg, setFormMsg] = useState("");
  const [severity, setSeverity] = useState("error");
  const [approvalConfirmationOpen, setApprovalConfirmationOpen] =
    useState(false);
  const [rejectConfirmationOpen, setRejectConfirmationOpen] = useState(false);
  const [rejectionReason, setRejectReason] = useState(REJECTION_INITIAL_DATA);
  const [approvalFormData, setApprovalFormData] = useState(
    APPROVAL_INITIAL_DATA
  );

  const handleInfoClick = (row) => {
    setSelectedRow(row);
    setInfoOpen(true);
  };

  const handleApproveClick = () => {
    setApprovalConfirmationOpen(true);
  };
  const handleRejectClick = () => {
    setRejectConfirmationOpen(true);
  };

  const handleApproveSubmit = async () => {
    setDisabled(true);
    try {
      const response = await axios.post("/approval", {
        ...approvalFormData,
        id: selectedRow.id,
      });

      await queryClient.setQueryData("approvalData", (oldData) =>
        oldData.filter((item) => item.id != selectedRow?.id)
      );
      await queryClient.invalidateQueries("farmersData");
      setSeverity("success");
      setFormMsg("Farmer's data approved successfully.");
      setApprovalFormData(APPROVAL_INITIAL_DATA);
      setInfoOpen(false);
    } catch (error) {
      setSeverity("error");
      setFormMsg("Approval of farmer's data failed. Please try again.");
      console.log(error);
    }
    setSnackOpen(true);
    setApprovalConfirmationOpen(false);
    setDisabled(false);
  };
  const handleRejectSubmit = async () => {
    setDisabled(true);
    console.log("submit");
    if (
      !rejectionReason.duplicate &&
      !rejectionReason.falseInfo &&
      !rejectionReason.incomplete &&
      !rejectionReason.invalidID &&
      !rejectionReason.missingDoc &&
      !rejectionReason.notEligible &&
      !rejectionReason.others
    ) {
      setFormMsg("At least one reason must be selected.");
      setSeverity("warning");
      setDisabled(false);
      setRejectConfirmationOpen(false);
      setSnackOpen(true);
      return;
    }

    try {
      const response = await axios.post("/approval/reject", {
        rejectionReason,
        id: selectedRow.id,
      });

      console.log(response.data);

      await queryClient.setQueryData("approvalData", (oldData) =>
        oldData.filter((item) => item.id != selectedRow?.id)
      );
      await queryClient.invalidateQueries("rejectedData");
      setSeverity("success");
      setFormMsg("Farmer's data rejected successfully.");
    } catch (error) {
      setSeverity("error");
      setFormMsg("Failed to reject farmer's data. Please try again.");
      console.log(error);
    }
    setSnackOpen(true);
    setDisabled(false);
    setRejectConfirmationOpen(false);
    setInfoOpen(false);
    setRejectReason(REJECTION_INITIAL_DATA);
  };

  const handleCheckboxChange = (e) => {
    setRejectReason((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };
  const ActionButtonColumn = {
    field: "actions",
    headerName: "Actions",
    width: 200,
    editable: false,
    headerClassName: "data-grid-header",
    headerAlign: "center",
    filterable: false,

    renderCell: (params) => (
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        height="100%"
        gap={1}
      >
        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={() => handleInfoClick(params.row)}
        >
          Info
        </Button>
      </Stack>
    ),
  };
  return (
    <>
      <DataGrid
        loading={approvalDataLoading}
        rows={approvalData}
        columns={[...APPROVAL_TABLE_COLUMN, ActionButtonColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
              page: 0,
            },
          },
        }}
        pageSizeOptions={[10, 50, 100]}
        disableRowSelectionOnClick
        sx={DATA_GRID_STYLE}
        disableColumnResize
        slots={{
          toolbar: () => (
            <TableToolbar
              titleText="Pending Farmers"
              subText="Farmers Awaiting Approval"
              actionBtn={
                <>
                  <TableFilterBtn />
                  <TableQuickFilter />
                </>
              }
            />
          ),
        }}
      />
      <InfoModal
        open={infoOpen}
        onClose={() => {
          setInfoOpen(false);
          setRejectReason(REJECTION_INITIAL_DATA);
          setApprovalFormData(APPROVAL_INITIAL_DATA);
        }}
        row={selectedRow}
        actionButton={
          <>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={handleRejectClick}
            >
              Reject
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleApproveClick}
            >
              Approve
            </Button>
          </>
        }
      />

      {/* <ConfirmationDialog
        disabled={disabled}
        title="Approval Confirmation"
        content="Are you sure you want to approve this farmer's data?"
        open={approvalConfirmationOpen}
        setOpen={setApprovalConfirmationOpen}
        confirm={handleApproveSubmit}
        serverity="info"
      /> */}

      <ApprovalModal
        disabled={disabled}
        open={approvalConfirmationOpen}
        onClose={() => setApprovalConfirmationOpen(false)}
        approvalFormData={approvalFormData}
        setApprovalFormData={setApprovalFormData}
        onSubmit={handleApproveSubmit}
      />

      <RejectionModal
        disabled={disabled}
        handleCheckboxChange={handleCheckboxChange}
        handleRejectSubmit={handleRejectSubmit}
        open={rejectConfirmationOpen}
        rejectionReason={rejectionReason}
        onClose={() => setRejectConfirmationOpen(false)}
        setRejectReason={setRejectReason}
      />

      <SnackBar
        severity={severity}
        msg={formMsg}
        open={snackOpen}
        onClose={setSnackOpen}
      />
    </>
  );
};

export default Approval;
