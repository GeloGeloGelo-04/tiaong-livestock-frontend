import { Box, Typography } from "@mui/material";
import React from "react";

const Missing = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">Page not found</Typography>
    </Box>
  );
};

export default Missing;
