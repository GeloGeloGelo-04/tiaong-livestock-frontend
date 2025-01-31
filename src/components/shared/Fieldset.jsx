import { Box } from "@mui/material";
import React from "react";

function Fieldset({ title, children }) {
  return (
    <Box
      component={"fieldset"}
      sx={{
        border: "1px solid #1A237E",
        borderRadius: 2,
      }}
    >
      <legend style={{ color: "#1A237E" }}>{title}</legend>
      {children}
    </Box>
  );
}

export default Fieldset;
