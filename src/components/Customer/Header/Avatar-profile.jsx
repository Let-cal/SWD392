import GradingIcon from "@mui/icons-material/Grading";
import Logout from "@mui/icons-material/Logout";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../LoginController/AuthContext.jsx";
export default function AvatarProfile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [initial, setInitial] = React.useState("");
  const open = Boolean(anchorEl);
  const email = localStorage.getItem("email");
  React.useEffect(() => {
    if (email) {
      setInitial(email.charAt(0).toUpperCase());
    }
  }, [email]);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    navigate("/login");
  };
  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>{initial}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link
          to={{
            pathname: "/CustomerProfile-order",
            state: { index: 2 }, // Pass the index value here
          }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> My Account
          </MenuItem>
        </Link>

        <Divider />
        <Link to="/CustomerProfile-order">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <GradingIcon fontSize="small" />
            </ListItemIcon>
            My orders
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
