import { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PropTypes from "prop-types";

const InputForm = ({
  label,
  placeholder,
  isPassword = false,
  inputType = "text",
  name,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      label={label}
      type={isPassword ? (showPassword ? "text" : "password") : inputType}
      name={name}
      value={value}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      margin="normal"
      onChange={onChange}
      InputProps={
        isPassword
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
    />
  );
};

InputForm.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  inputType: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputForm;
