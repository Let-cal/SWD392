import PropTypes from "prop-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
const ClearButton = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 200px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DatePickerContainer = styled.div`
  position: relative;
`;

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
    <DatePickerContainer>
      <StyledDatePicker
        selected={date}
        onChange={handleDateChange}
        placeholderText={placeholderText}
      />
      {date && (
        <ClearButton onClick={clearDate}>
          <FaTimes />
        </ClearButton>
      )}
    </DatePickerContainer>
  );
};
DatePickerWithClearButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.func.isRequired,
  placeholderText: PropTypes.string.isRequired,
};
export default DatePickerWithClearButton;
