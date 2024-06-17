import TuneIcon from "@mui/icons-material/Tune";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const FilterComponent = ({
  category,
  material,
  gender,
  handleChangeCategory,
  handleChangeMaterial,
  handleChangeGender,
  handleDeleteFilter,
  categoryMap,
  materialMap,
  genderMap,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const filters = [
    {
      label: "Category",
      value: category ? categoryMap[category] : "",
      handleDelete: () => handleDeleteFilter("category"),
    },
    {
      label: "Material",
      value: material ? materialMap[material] : "",
      handleDelete: () => handleDeleteFilter("material"),
    },
    {
      label: "Gender",
      value: gender ? genderMap[gender] : "",
      handleDelete: () => handleDeleteFilter("gender"),
    },
  ].filter((filter) => filter.value);

  return (
    <>
      <Button
        id="basic-button"
        className=""
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
        }}
      >
        <TuneIcon />
        FILTER
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box sx={{ flexGrow: 1, maxWidth: 752, paddingX: 2.5 }}>
          <div className="flex flex-col">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender}
                onChange={handleChangeGender}
              >
                <FormControlLabel value="1" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value="3" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={category}
                onChange={handleChangeCategory}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.entries(categoryMap).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Material
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={material}
                onChange={handleChangeMaterial}
                label="Material"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.entries(materialMap).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
          {filters.map((filter, index) => (
            <Chip
              key={index}
              label={`${filter.label}: ${filter.value}`}
              onDelete={filter.handleDelete}
            />
          ))}
        </Box>
      </Menu>
    </>
  );
};

FilterComponent.propTypes = {
  category: PropTypes.string,
  material: PropTypes.string,
  gender: PropTypes.string,
  handleChangeCategory: PropTypes.func.isRequired,
  handleChangeMaterial: PropTypes.func.isRequired,
  handleChangeGender: PropTypes.func.isRequired,
  handleDeleteFilter: PropTypes.func.isRequired,
  categoryMap: PropTypes.object.isRequired,
  materialMap: PropTypes.object.isRequired,
  genderMap: PropTypes.object.isRequired,
  zodiacMap: PropTypes.object.isRequired,
};

export default FilterComponent;
