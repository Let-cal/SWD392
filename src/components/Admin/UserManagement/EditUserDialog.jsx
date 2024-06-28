import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const EditUserDialog = ({ open, handleClose, userData, updateUser }) => {
  const [updatedUser, setUpdatedUser] = useState(userData);
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

  const handleSave = async () => {
    console.log("Updated User Data:", updatedUser);
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
          value={updatedUser["full-name"]}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          value={updatedUser.email}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="address"
          name="address"
          label="Address"
          type="text"
          fullWidth
          value={updatedUser.address}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="telephone-number"
          name="telephone-number"
          label="Telephone Number"
          type="tel"
          fullWidth
          value={updatedUser["telephone-number"]}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save Changes
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
