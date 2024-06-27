import FilterListIcon from "@mui/icons-material/FilterList";
import { Grid, IconButton, Popover } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import DatePickerWithClearButton from "../OrderManagement/DatePickerWithClearButton";

const DateFilterPopover = ({ onFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateOpen, setDateOpen] = useState(null);
  const [dateClose, setDateClose] = useState(null);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleApplyFilter = () => {
    onFilter(dateOpen, dateClose);
    handleClosePopover();
  };

  const handleResetFilter = () => {
    setDateOpen(null);
    setDateClose(null);
    onFilter(null, null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "date-filter-popover" : undefined;

  return (
    <>
      <IconButton color="primary" onClick={handleOpenPopover}>
        <FilterListIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid container spacing={2} style={{ padding: "16px", width: "300px" }}>
          <Grid item xs={12}>
            <DatePickerWithClearButton
              selected={dateOpen}
              onChange={setDateOpen}
              placeholderText="Select date open"
            />
          </Grid>
          <Grid item xs={12}>
            <DatePickerWithClearButton
              selected={dateClose}
              onChange={setDateClose}
              placeholderText="Select date close"
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <IconButton onClick={handleResetFilter} color="primary">
              Reset
            </IconButton>
            <IconButton onClick={handleApplyFilter} color="primary">
              Apply Filters
            </IconButton>
          </Grid>
        </Grid>
      </Popover>
    </>
  );
};

DateFilterPopover.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default DateFilterPopover;
