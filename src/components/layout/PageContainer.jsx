import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Tab from "./Tab";

export const PageContainer = ({ children, tabs, titleText, subText }) => {
  return (
    <Paper
      sx={{
        boxSizing: "border-box",
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {tabs && <Tab links={tabs} />}

      <Box p={3} height="calc(100% - 58px)" boxSizing={"border-box"}>
        {titleText && (
          <Stack boxSizing="border-box" mb={1}>
            <Typography variant="h6" fontWeight={600}>
              {titleText}
            </Typography>
            <Typography variant="body2" mt={-0.5}>
              {subText}
            </Typography>
          </Stack>
        )}
        {children}
      </Box>
    </Paper>
  );
};
