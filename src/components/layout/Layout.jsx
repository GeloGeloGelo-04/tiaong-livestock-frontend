import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import SideBar from "./SideBar";
import { Grid2, Stack } from "@mui/material";

import useAuth from "../../hooks/useAuth";

const Layout = () => {
  const [open, setOpen] = useState(true);
  const auth = useAuth();

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        bgcolor: "primary.main",
        p: 1,
        gap: 1,
      }}
    >
      <SideBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
