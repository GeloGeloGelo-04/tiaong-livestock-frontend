import React from "react";
import { ContainerModal } from "../../components/shared/ContainerModal";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import "./style.scss";

function InfoModal({ open, onClose, actionButton, row, rejectionReasonShow }) {
  return (
    <ContainerModal
      title="Farmer's Information"
      open={open}
      onClose={onClose}
      actionButton={actionButton}
      maxWidth="sm"
    >
      <Box>
        <Typography color="#888">
          <b>Registered at:</b>{" "}
          {dayjs(row?.registeredAt).format("MMMM DD, YYYY")}
        </Typography>
        {row?.archivedAt && (
          <Typography color="#888">
            <b>Archived at:</b> {dayjs(row?.archivedAt).format("MMMM DD, YYYY")}
          </Typography>
        )}
        {row?.rejectedAt && (
          <Typography color="#888">
            <b>Rejected at:</b>{" "}
            {dayjs(row?.rejectedAt).format("MMMM DD, YYYY")}
          </Typography>
        )}

        {rejectionReasonShow && row.rejectionReason && (
          <>
            <Typography
              color="primary"
              borderBottom="2px solid #007bff"
              width="100%"
              mt={2}
            >
              Reason of Rejection
            </Typography>

            <FormControlLabel
              control={<Checkbox />}
              label="Incomplete Application"
              checked={row?.rejectionReason.incomplete}
              name="incomplete"
              disabled={true}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Invalid or Missing ID"
              checked={row?.rejectionReason.invalidID}
              name="invalidID"
              disabled={true}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Not Eligible (non-farmer)"
              checked={row?.rejectionReason.notEligible}
              name="notEligible"
              disabled={true}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Duplicate Application"
              checked={row?.rejectionReason.duplicate}
              name="duplicate"
              disabled={true}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="False Information"
              checked={row?.rejectionReason.falseInfo}
              name="falseInfo"
              disabled={true}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Missing Documents"
              checked={row?.rejectionReason.missingDoc}
              name="missingDoc"
              disabled={true}
            />
            <FormControlLabel
              control={<Checkbox />}
              label={`Other, Specify: ${row?.rejectionReason.specify}`}
              checked={row?.rejectionReason.others}
              name="others"
              disabled={true}
            />
          </>
        )}

        <Typography
          color="primary"
          borderBottom="2px solid #007bff"
          width="100%"
          mt={2}
        >
          Personal Information
        </Typography>

        <Stack p={2}>
          <Stack direction="row" gap={3}>
            <img
              src={row?.userImage}
              alt="farmer.png"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: 160,
                maxHeight: 160,
                borderRadius: 8,
                boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.1)",
              }}
            />
            <Stack>
              <Typography color="#888">
                <b>Name:</b> {row?.firstname} {row?.middlename} {row?.surname}{" "}
                {row?.extensionName}
              </Typography>
              <Typography color="#888">
                <b>Sex:</b> {row?.sex}
              </Typography>
              <Typography color="#888">
                <b>Contact No:</b> {row?.contactNo}
              </Typography>
              <Typography color="#888">
                <b>Date of Birth:</b>{" "}
                {dayjs(row?.birthDate).format("MMMM DD, YYYY")}
              </Typography>
              <Typography color="#888">
                <b>Place of Birth:</b> {row?.birthPlace}
              </Typography>
              <Typography color="#888">
                <Typography color="#888">
                  <b>Religion:</b>{" "}
                  {row?.religion == "Others"
                    ? row?.specifyReligion
                    : row?.religion}
                </Typography>
                <b>Civil Status:</b> {row?.civilStatus}
              </Typography>
              <Typography color="#888">
                <b>Name of Spouse if Maried:</b> {row?.spouseName}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Typography
          color="primary"
          borderBottom="2px solid #007bff"
          width="100%"
        >
          Valid ID
        </Typography>
        <Stack mt={2} alignItems="center">
          <img
            src={row?.idImage}
            alt="farmer.png"
            style={{
              maxHeight: 200,
              boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.1)",
              borderRadius: 8,
            }}
          />
        </Stack>

        <Typography
          color="primary"
          borderBottom="2px solid #007bff"
          width="100%"
          mt={2}
        >
          Location & Livelihood
        </Typography>

        <Stack display="flex" p={2}>
          <Typography color="#888">
            <b>Main Livelihood:</b> {row?.livelihood}
          </Typography>
          <Typography color="#888">
            <b>House/Lot/Bldg:</b> {row?.houseNo}
          </Typography>
          <Typography color="#888">
            <b>Street/Sitio/Subd:</b> {row?.street}
          </Typography>
          <Typography color="#888">
            <b>Barangay:</b> {row?.barangay}
          </Typography>
          <Typography color="#888">
            <b>Municipality/City:</b> Tiaong
          </Typography>
          <Typography color="#888">
            <b>Province:</b> Laguna
          </Typography>
          <Typography color="#888">
            <b>Region:</b> IV-A(CALABARZON)
          </Typography>
        </Stack>

        <Typography
          color="primary"
          borderBottom="2px solid #007bff"
          width="100%"
        >
          Education & Membership
        </Typography>

        <Stack p={2}>
          <Typography color="#888">
            <b>Highest Formal Education:</b> {row?.education}
          </Typography>
          <Typography color="#888">
            <b>Person with Disability(PWD):</b> {row?.PWD}
          </Typography>
          <Typography color="#888">
            <b>4P's Beneficiary:</b> {row?._4ps}
          </Typography>
          <Typography color="#888">
            <b>Member of an Indigenous Group:</b> {row?.memberIndigenousGroup}
          </Typography>
          <Typography color="#888">
            <b>If yes, specify:</b> {row?.specifyIndigenousGroup}
          </Typography>
          <Typography color="#888">
            <b>Member of any Farmers Association/Cooperative:</b>{" "}
            {row?.memberAssociationOrCooperative}
          </Typography>
          <Typography color="#888">
            <b>If yes, specify:</b> {row?.specifyAssociationOrCooperative}
          </Typography>
        </Stack>
        <Typography
          color="primary"
          borderBottom="2px solid #007bff"
          width="100%"
        >
          Identification & Emergency
        </Typography>

        <Stack p={2}>
          <Typography color="#888">
            <b>With Government ID:</b> {row?.withGovernmentID}
          </Typography>
          <Typography color="#888">
            <b>if yes, Specify ID Type:</b> {row?.specifyGovernmentID}
          </Typography>
          <Typography color="#888">
            <b>ID Number:</b> {row?.idNumber}
          </Typography>

          <Typography color="#888">
            <b>Person to Notify in Case of Emergency:</b>{" "}
            {row?.personToNotifyInCaseEmergency}
          </Typography>
          <Typography color="#888">
            <b>Contact No:</b> {row?.contactPersonToNotifyInCaseEmergency}
          </Typography>
        </Stack>

        <Typography
          color="primary"
          borderBottom="2px solid #007bff"
          width="100%"
        >
          Household Information
        </Typography>

        <Stack p={2}>
          <Typography color="#888">
            <b>Mother's Maiden Name:</b> {row?.motherMaidenName}
          </Typography>
          <Typography color="#888">
            <b>Household Head:</b> {row?.householdHead}
          </Typography>
          <Typography color="#888">
            <b>If no, name of household head:</b>{" "}
            {row?.householdHead == "No"
              ? row?.nameOfHouseholdHead
              : `${row?.firstname} ${row?.middlename} ${row?.surname} ${row?.extensionName}`}
          </Typography>
          <Typography color="#888">
            <b>Relationship:</b> {row?.householdRelationship}
          </Typography>
          <Typography color="#888">
            <b>No. of living household members:</b> {row?.numberOfLivingHead}
          </Typography>
          <Typography color="#888">
            <b>No. of male:</b> {row?.noMale}
          </Typography>
          <Typography color="#888">
            <b>No. of female:</b> {row?.noFemale}
          </Typography>
        </Stack>
      </Box>
    </ContainerModal>
  );
}

export default InfoModal;
