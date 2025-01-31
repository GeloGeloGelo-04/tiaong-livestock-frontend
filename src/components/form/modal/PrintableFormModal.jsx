import React, { useRef } from "react";
import { ContainerModal } from "../../shared/ContainerModal";
import { AssessorFormPrintable } from "../../printable/assessor-form/AssessorFormPrintable";
import { Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";

export const PrintableFormModal = ({ open, onClose, row }) => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <ContainerModal
      title="Assessor  Form"
      open={open}
      onClose={onClose}
      actionButton={
        <>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={reactToPrintFn}>
            Print
          </Button>
        </>
      }
    >
      <AssessorFormPrintable ref={contentRef} row={row} />
    </ContainerModal>
  );
};
