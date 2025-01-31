import {
  Avatar,
  Box,
  Chip,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import backgroundImage from "../../assets/images/header-bg.jpg";
import { Logout } from "@mui/icons-material";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const headerStyle = {
  width: "100%",
  height: "100px",
  position: "absolute",
  zIndex: "1",
  top: "-8px",
  left: "0",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  boxSizing: "border-box",
  backgroundImage: `linear-gradient(rgba(12, 19, 99, .8), rgba(12, 19, 99, .8)), url(${backgroundImage})`,
};

export const UserMenu = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    // navigate("/login");
    window.location.reload();
    //navigate to login
  };

  return (
    <Menu
      sx={{ mt: 3 }}
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <Stack minWidth="250px" direction="column" alignItems="center" pt={5}>
        <Box sx={headerStyle} />
        <Avatar
          sx={{
            width: 70,
            height: 70,
            zIndex: 1,
            border: "2px solid #FFF",
            boxSizing: "border-box",
          }}
        />
        <Typography component={"span"} zIndex="2" variant="h6" mt={1}>
          Yman Mangaring
        </Typography>
        <Typography component={"span"} zIndex="2" variant="caption">
          ymanmangairng@example.com
        </Typography>

        <Chip sx={{ mt: 2 }} label="Admin" color="primary" size="small" />

        <MenuItem
          onClick={handleLogout}
          sx={{
            width: "100%",
            justifyContent: "center",
            mt: 3,
            gap: 1,
            color: "#808080",
          }}
        >
          <Logout sx={{ color: "grey" }} />
          Logout
        </MenuItem>
      </Stack>
    </Menu>
  );
};
