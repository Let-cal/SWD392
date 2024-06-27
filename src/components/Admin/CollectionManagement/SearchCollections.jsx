// SearchCollections.jsx

import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const SearchCollections = ({ value, onChange }) => {
  return (
    <TextField
      label="Search Collections"
      variant="standard"
      sx={{ width: "100%" }}
      value={value}
      onChange={onChange}
    />
  );
};

SearchCollections.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchCollections;
