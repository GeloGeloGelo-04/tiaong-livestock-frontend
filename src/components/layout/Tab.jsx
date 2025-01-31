import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Tab = ({ links }) => {
  return (
    <Paper
      component={Stack}
      direction={"row"}
      elevation={0}
      pl={3}
      sx={{ borderRadius: 0, borderBottom: "1px solid #e2e2e2" }}
    >
      {links &&
        links.map((obj, index) => {
          return (
            <NavLink key={index} to={obj.to} className="tab-link" end>
              <Typography> {obj.label}</Typography>
            </NavLink>
          );
        })}
    </Paper>
  );
};

export default Tab;
