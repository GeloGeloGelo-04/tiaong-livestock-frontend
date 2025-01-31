import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TableToolbar } from "../../components/form/table/TableToolbar";
import TableFilterBtn from "../../components/form/table/TableFilterBtn";
import TableQuickFilter from "../../components/form/table/TableQuickFilter";
import { APPROVAL_TABLE_COLUMN, DATA_GRID_STYLE } from "../../utils/constant";
import useData from "../../hooks/useData";
import { Button, Stack } from "@mui/material";
import InfoModal from "./InfoModal";

const RejectedPage = () => {
  const { rejectedData, rejectedDataLoading } = useData();
  const [selectedRow, setSelectedRow] = useState({});
  const [infoOpen, setInfoOpen] = useState(false);

  const handleInfoClick = (row) => {
    setSelectedRow(row);
    setInfoOpen(true);
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
        loading={rejectedDataLoading}
        rows={rejectedData}
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
              titleText="Rejected Farmers"
              subText="List of Farmers with Rejected Applications"
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
        onClose={() => setInfoOpen(false)}
        row={selectedRow}
        rejectionReasonShow={true}
        actionButton={
          <>
            <Button
              size="small"
              variant="contained"
              onClick={() => setInfoOpen(false)}
            >
              Close
            </Button>
          </>
        }
      />
    </>
  );
};

export default RejectedPage;
