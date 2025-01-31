import React, { useState } from "react";
import { PageContainer } from "../../components/layout/PageContainer";
import {
  Box,
  Button,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddAnnouncementModal from "./AddAnnouncementModal";
import axios from "../../api/axios";
import SnackBar from "../../components/shared/SnackBar";
import useData from "../../hooks/useData";
import dayjs from "dayjs";
import { useQueryClient } from "react-query";
import ViewAnnouncementModal from "./ViewAnnouncementModal";
import ConfirmationDialog from "../../components/shared/ConfirmationDialog";
import { AnnouncementOutlined } from "@mui/icons-material";

const Announcement = () => {
  const { announcementData } = useData();
  const queryClient = useQueryClient();
  const [disabled, setDisabled] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [severity, setSeverity] = useState("success");
  const [editMode, setEditMode] = useState(false);
  const [errorSnackOpen, setErrorSnackOpen] = useState(false);
  const [deleteConfimationOpen, setDeleteConfimationOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    message: "",
    createdAt: null,
  });

  const handleAnnouncementSubmit = async () => {
    setDisabled(true);
    try {
      const response = await axios.post("/announcement", formData);

      await queryClient.invalidateQueries("announcementData");

      setFormData({
        id: "",
        title: "",
        message: "",
      });
      setSeverity("success");
      setAlertMsg("Announcement has been added successfully.");
      setSnackOpen(true);
      setAddModalOpen(false);
    } catch (error) {
      console.log(error);
      setSeverity("error");
      setAlertMsg("Failed to add the announcement. Please try again.");
      setSnackOpen(true);
    }
    setDisabled(false);
  };

  const handleSeeMoreClick = (val) => {
    setInfoModalOpen(true);
    setFormData({
      id: val?._id,
      title: val?.title,
      message: val?.message,
      createdAt: val?.createdAt,
    });
  };

  const handleUpdateSumbit = async () => {
    setDisabled(true);
    try {
      const response = await axios.patch("/announcement", formData);
      await queryClient.invalidateQueries("announcementData");

      setSeverity("success");
      setAlertMsg("Announcement Updated Successfully");
      setSnackOpen(true);
      setEditMode(false);
    } catch (error) {
      setSeverity("error");
      setAlertMsg("Failed to update Announcement, Please try again.");
      setSnackOpen(true);
      console.log(error);
    }
    setDisabled(false);
  };
  const handleDeleteSumbit = async () => {
    setDisabled(true);
    try {
      const response = await axios.delete("/announcement", {
        data: { id: formData.id },
      });
      await queryClient.invalidateQueries("announcementData");

      setDeleteConfimationOpen(false);
      setInfoModalOpen(false);
      setSeverity("success");
      setAlertMsg("Announcement Deleted Successfully");
      setSnackOpen(true);

      setFormData({
        id: "",
        title: "",
        message: "",
      });
    } catch (error) {
      setSeverity("error");
      setAlertMsg("Failed to delete Announcement, Please try again.");
      setSnackOpen(true);
      console.log(error);
    }
    setDisabled(false);
  };
  return (
    <>
      <PageContainer>
        <Stack
          width="100%"
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight={600}>
              Announcement for Farmers
            </Typography>
            <Typography variant="body1">
              Stay updated with the latest news and updates for farmers.
            </Typography>
          </Box>

          <Button
            startIcon={<AnnouncementOutlined />}
            variant="contained"
            onClick={() => setAddModalOpen(true)}
          >
            Add Announcement
          </Button>
        </Stack>

        <Stack
          mt={3}
          height={"calc(100vh - 160px)"}
          p={2}
          display={"grid"}
          gridTemplateColumns={"auto auto auto"}
          justifyContent={"flex-start"}
          alignContent={"flex-start"}
          gap={2}
          sx={{
            overflowY: "scroll",
          }}
        >
          {announcementData?.map((val, i) => (
            <Paper
              key={i}
              elevation={5}
              sx={{
                padding: 2,
                width: "100%",
                maxWidth: 300,
                minHeight: 250,
                maxHeight: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  color="primary.main"
                  fontWeight={600}
                  sx={{
                    maxWidth: "300px", // Set the max width as needed
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {val?.title}
                </Typography>
                <Typography variant="body2" color="#888">
                  Date: {dayjs(val?.createdAt).format("MM/DD/YYYY")}
                </Typography>
                <Typography
                  variant="body1"
                  mt={1}
                  color="#888"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {val?.message}
                </Typography>
              </Box>
              <Box>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ mt: "auto" }}
                  onClick={() => handleSeeMoreClick(val)}
                >
                  See More
                </Button>
              </Box>
            </Paper>
          ))}
        </Stack>
      </PageContainer>
      <AddAnnouncementModal
        open={addModalOpen}
        disabled={disabled}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAnnouncementSubmit}
        formData={formData}
        setFormData={setFormData}
      />

      <ViewAnnouncementModal
        open={infoModalOpen}
        disabled={disabled}
        editMode={editMode}
        formData={formData}
        setEditMode={setEditMode}
        setFormData={setFormData}
        handleDeleteClick={() => setDeleteConfimationOpen(true)}
        onSubmit={handleUpdateSumbit}
        onClose={() => {
          setEditMode(false);
          setInfoModalOpen(false);
          setFormData({
            id: "",
            title: "",
            message: "",
            createdAt: null,
          });
        }}
      />

      <SnackBar
        open={snackOpen}
        onClose={setSnackOpen}
        msg={alertMsg}
        severity={severity}
      />

      <ConfirmationDialog
        open={deleteConfimationOpen}
        disabled={disabled}
        setOpen={setDeleteConfimationOpen}
        title="Delete Confirmation"
        content="Are you sure you want to delete this announcement?"
        confirm={handleDeleteSumbit}
        serverity="error"
      />
    </>
  );
};

export default Announcement;
