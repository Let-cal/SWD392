import { IconButton, InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { FaTimes } from "react-icons/fa";

const DatePickerWithClearButton = ({ selected, onChange, placeholderText }) => {
  const [date, setDate] = useState(selected);

  const handleDateChange = (date) => {
    setDate(date);
    onChange(date);
  };

  const clearDate = () => {
    setDate(null);
    onChange(null);
  };

  return (
    <TextField
      margin="dense"
      label={placeholderText}
      fullWidth
      type="date"
      value={date ? date.toISOString().split("T")[0] : ""}
      onChange={(e) => {
        const selectedDate = new Date(e.target.value);
        handleDateChange(selectedDate);
      }}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {date && (
              <IconButton onClick={clearDate} edge="end">
                <FaTimes />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

DatePickerWithClearButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(Date),
  placeholderText: PropTypes.string.isRequired,
};

export default DatePickerWithClearButton;
