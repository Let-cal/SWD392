import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useState } from "react";
import Input from "./InputForm";

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
    const requestData = { email, password, fullName, telephoneNumber };

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        enqueueSnackbar("Authentication token is missing", {
          variant: "error",
        });
        return;
      }

      console.log("Request Data:", requestData); // Log the request payload

      await axios.post(
        "https://zodiacjewerly.azurewebsites.net/api/Authen/NewAccountStaff",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      enqueueSnackbar("Staff account created successfully", {
        variant: "success",
      });
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
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button onClick={onClose} style={modalStyles.closeButton}>
          X
        </button>
        <h2 className="font-bold mb-4 text-2xl font-serif">
          Create Staff Account
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            Content="Email Address"
            Placeholder="Enter your Email"
            propMinWidth="66px"
            name="email"
            inputType="email"
            onChange={handleChange}
          />
          <Input
            Content="Password"
            Placeholder="Enter your password"
            propMinWidth="200px"
            isPassword={true}
            name="password"
            onChange={handleChange}
          />
          <Input
            Content="Confirm your password"
            Placeholder="Enter your password again"
            propMinWidth="200px"
            isPassword={true}
            name="confirmPassword"
            onChange={handleChange}
          />
          <Input
            Content="Fullname"
            Placeholder="Enter your Fullname"
            propMinWidth="200px"
            name="fullName"
            inputType="text"
            onChange={handleChange}
          />
          <Input
            Content="Telephone Number"
            Placeholder="+84"
            propMinWidth="200px"
            name="telephoneNumber"
            inputType="text"
            onChange={handleChange}
          />
          <button type="submit" style={modalStyles.submitButton}>
            Create Staff
          </button>
        </form>
        <Backdrop style={{ color: "#fff", zIndex: 1000 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
};

CreateStaffModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  submitButton: {
    background: "#000",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default CreateStaffModal;
