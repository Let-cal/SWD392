import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useState } from "react";
import swal from "sweetalert";
import InputForm from "./InputForm";
const CreateStaffModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    telephoneNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    const { email, password, fullName, telephoneNumber } = formData;
    console.log("Request Data:", {
      email: email,
      password: password,
      "full-name": fullName,
      "telephone-number": telephoneNumber,
    });
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      if (!token) {
        enqueueSnackbar("Authentication token is missing", {
          variant: "error",
        });
        return;
      }

      await axios.post(
        "https://zodiacjewerlyswd.azurewebsites.net/api/authentication/staff",
        {
          email: email,
          password: password,
          "full-name": fullName,
          "telephone-number": telephoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      swal("No error!", "Image updated successfully!", "success");

      onClose();
    } catch (error) {
      console.error("Error:", error.response?.data); // Log the error response
      enqueueSnackbar(
        error.response?.data?.message || "Failed to create staff account",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Staff Account</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <InputForm
            label="Email Address"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputForm
            label="Password"
            placeholder="Enter your password"
            isPassword
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputForm
            label="Confirm Password"
            placeholder="Confirm your password"
            isPassword
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <InputForm
            label="Full Name"
            placeholder="Enter your full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <InputForm
            label="Telephone Number"
            placeholder="+84"
            name="telephoneNumber"
            value={formData.telephoneNumber}
            onChange={handleChange}
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{ backgroundColor: "black" }}
              variant="contained"
            >
              Create Staff
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      <Backdrop style={{ color: "#fff", zIndex: 1000 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};

CreateStaffModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateStaffModal;
