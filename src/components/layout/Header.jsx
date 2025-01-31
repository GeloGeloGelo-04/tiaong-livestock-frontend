import { MenuRounded } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import logo from "../../assets/images/favicon.svg";
import backgroundImage from "../../assets/images/header-bg.jpg";
import UserAvatar from "../shared/UserAvatar";
import { HEADER_HEIGHT } from "../../utils/constant";

const headerContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: HEADER_HEIGHT,
  width: "100%",
  padding: "8px 24px",
  boxSizing: "border-box",
  borderRadius: 3,
  bgcolor: "#FFF",
};

export const Header = (props) => {
  return (
    <Paper sx={headerContainerStyle}>
      <Typography variant="h6" fontWeight={600} color="primary.main">
        TIAONG LIVESTOCK MANAGEMENT SYSTEM
      </Typography>

      <UserAvatar />
    </Paper>
  );
};
