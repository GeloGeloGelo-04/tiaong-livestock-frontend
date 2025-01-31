import Avatar from "@mui/material/Avatar";
import { Typography, Box, Stack } from "@mui/material";
import { useState } from "react";
import { UserMenu } from "./UserMenu";

const UserAvatar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Stack alignItems="center" direction="row" gap={1}>
      {/* Avatar with click event to trigger popover */}
      <Avatar
        onClick={handleClick}
        sx={{
          width: 40,
          height: 40,
          border: "2px solid #FFF",
          boxSizing: "border-box",
          cursor: "pointer",
        }}
      />

      {/* Typography for user name and email */}
      <Stack>
        <Typography variant="body2" fontWeight={600} color="primary.main">
          Admin Username {/* Replace with dynamic name */}
        </Typography>
        <Typography
          display="block"
          variant="caption"
          fontSize="10px"
          mt={-0.3}
          color="primary.main"
        >
          useradmin@example.com {/* Replace with dynamic email */}
        </Typography>
      </Stack>

      {/* Popover with anchorOrigin and transformOrigin layout */}
      <UserMenu open={open} handleClose={handleClose} anchorEl={anchorEl} />
    </Stack>
  );
};

export default UserAvatar;
