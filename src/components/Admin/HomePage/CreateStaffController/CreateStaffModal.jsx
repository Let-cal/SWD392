import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const CreateStaffModal = ({ isOpen, onClose, onFetchAPI }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    telephoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateTelephoneNumber = (telephoneNumber) => {
    const re = /^[0-9]{9}$/;
    return re.test(telephoneNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for the current field
    let newErrors = { ...errors };
    delete newErrors[name];

    switch (name) {
      case "email":
        if (value && !validateEmail(value)) {
          newErrors.email = "Invalid email address";
        }
        break;
      case "telephoneNumber":
        if (value && !validateTelephoneNumber(value)) {
          newErrors.telephoneNumber =
            "Telephone number must contain only numbers and must be exactly 9 digits";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0 || !formData.password) {
      enqueueSnackbar("Please fix the errors before submitting", {
        variant: "error",
      });
      return;
    }

    const { email, password, fullName, telephoneNumber } = formData;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        enqueueSnackbar("Authentication token is missing", {
          variant: "error",
        });
        return;
      }

      await axios.post(
        "https://zodiacjewerlyswd.azurewebsites.net/api/authentication/staff",
        {
          email,
          password,
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
      swal("No error!", "Staff created successfully!", "success");
      await onFetchAPI();
      onClose();
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Failed to create staff account",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { email, password, confirmPassword, telephoneNumber } = formData;
    let newErrors = {};

    if (email && !validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }
    if (telephoneNumber && !validateTelephoneNumber(telephoneNumber)) {
      newErrors.telephoneNumber = "Telephone number must contain only numbers and must be exactly 9 digits";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
  }, [formData]);

  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.email &&
    formData.password &&
    formData.fullName &&
    formData.telephoneNumber;

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Staff Account</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <TextField
            label="Full Name"
            placeholder="Enter your full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Telephone Number"
            placeholder="+84"
            name="telephoneNumber"
            value={formData.telephoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.telephoneNumber}
            helperText={errors.telephoneNumber}
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{ backgroundColor: "black" }}
              variant="contained"
              disabled={!isFormValid}
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
  onFetchAPI: PropTypes.func,
};

export default CreateStaffModal;
