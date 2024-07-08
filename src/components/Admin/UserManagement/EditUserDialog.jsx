import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// Styled Switch Component
const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const EditUserDialog = ({ open, handleClose, userData, updateUser }) => {
  const [updatedUser, setUpdatedUser] = useState(
    userData || {
      "full-name": "",
      email: "",
      address: "",
      "telephone-number": "",
      status: 0,
      "role-name": "Customer",
    }
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (userData) {
      setUpdatedUser(userData);
    }
  }, [userData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRoleChange = (event) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      "role-name": event.target.value,
    }));
  };

  const handleStatusChange = (event) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      status: event.target.checked ? 1 : 0,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://zodiacjewerlyswd.azurewebsites.net/api/users`,
        updatedUser
      );
      console.log("Update Response:", response.data);

      await updateUser(); // Update local state or refresh data
      enqueueSnackbar("User updated successfully", { variant: "success" });
      handleClose();
    } catch (error) {
      console.error("Update Error:", error);
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://zodiacjewerlyswd.azurewebsites.net/api/users/${updatedUser.id}`
      );
      console.log("Delete Response:", response.data);
      await updateUser(); // Update local state or refresh data
      enqueueSnackbar("User deleted successfully", { variant: "success" });
      handleClose();
    } catch (error) {
      console.error("Delete Error:", error);
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit User Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="full-name"
          name="full-name"
          label="Full Name"
          type="text"
          fullWidth
          value={updatedUser["full-name"] || ""}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          value={updatedUser.email || ""}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="address"
          name="address"
          label="Address"
          type="text"
          fullWidth
          value={updatedUser.address || ""}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="telephone-number"
          name="telephone-number"
          label="Telephone Number"
          type="tel"
          fullWidth
          value={updatedUser["telephone-number"] || ""}
          onChange={handleInputChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="role-name-label">Role</InputLabel>
          <Select
            labelId="role-name-label"
            id="role-name"
            name="role-name"
            value={updatedUser["role-name"]}
            onChange={handleRoleChange}
            label="Role"
          >
            <MenuItem value="Customer">Customer</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Staff">Staff</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Android12Switch
              checked={updatedUser.status === 1}
              onChange={handleStatusChange}
            />
          }
          label={
            <Typography
              variant="body1"
              style={{
                color: updatedUser.status === 1 ? "green" : "red",
              }}
            >
              {updatedUser.status === 1 ? "Active" : "Inactive"}
            </Typography>
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save Changes
        </Button>
        <Button onClick={handleDelete} color="error">
          <DeleteIcon />
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default EditUserDialog;
