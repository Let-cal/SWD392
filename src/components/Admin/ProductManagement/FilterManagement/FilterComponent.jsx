import { Tune as TuneIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import FilterChips from "./FilterChips";
const FilterComponent = ({
  search,
  setSearch,
  category,
  setCategory,
  material,
  setMaterial,
  gender,
  setGender,
  zodiac,
  setZodiac,
  price,
  setPrice,
  products,
  handleDeleteChip,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-col items-end">
      <TextField
        label="Search"
        placeholder="Search products"
        variant="standard"
        sx={{ width: "100%" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <Button
          id="basic-button"
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
            <div className="option flex flex-col gap-1">
              <FilterChips
                search={search}
                category={category}
                material={material}
                gender={gender}
                zodiac={zodiac}
                price={price}
                products={products}
                handleDeleteChip={handleDeleteChip}
              />
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1">Necklaces</MenuItem>
                  <MenuItem value="2">Bracelets</MenuItem>
                  <MenuItem value="3">Earrings</MenuItem>
                  <MenuItem value="4">Rings</MenuItem>
                  <MenuItem value="5">Tshirt</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel>Material</InputLabel>
                <Select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  label="Material"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1">Gold</MenuItem>
                  <MenuItem value="2">Emeral</MenuItem>
                  <MenuItem value="3">Diamonds</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Gender"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1">Male</MenuItem>
                  <MenuItem value="2">Female</MenuItem>
                  <MenuItem value="3">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel>Zodiac</InputLabel>
                <Select
                  value={zodiac}
                  onChange={(e) => setZodiac(e.target.value)}
                  label="Zodiac"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1">Aries</MenuItem>
                  <MenuItem value="2">Taurus</MenuItem>
                  <MenuItem value="3">Gemini</MenuItem>
                  <MenuItem value="4">Cancer</MenuItem>
                  <MenuItem value="5">Leo</MenuItem>
                  <MenuItem value="6">Virgo</MenuItem>
                  <MenuItem value="7">Libra</MenuItem>
                  <MenuItem value="8">Scorpio</MenuItem>
                  <MenuItem value="9">Sagittarius</MenuItem>
                  <MenuItem value="10">Capricorn</MenuItem>
                  <MenuItem value="11">Aquarius</MenuItem>
                  <MenuItem value="12">Pisces</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle1" component="div">
                <TuneIcon fontSize="small" sx={{ mr: 1 }} />
                Price
              </Typography>
              <Slider
                value={price}
                onChange={(e, newValue) => setPrice(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={Math.max(...products.map((p) => p.price))}
                sx={{ width: 200, mt: 2, mb: 1 }}
              />
              <div className="flex flex-row justify-between">
                <Typography variant="body2">{`$${price[0]}`}</Typography>
                <Typography variant="body2">{`$${price[1]}`}</Typography>
              </div>
            </Box>
          </Box>
        </Menu>
      </div>
    </div>
  );
};

FilterComponent.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  material: PropTypes.string.isRequired,
  setMaterial: PropTypes.func.isRequired,
  gender: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
  zodiac: PropTypes.string.isRequired,
  setZodiac: PropTypes.func.isRequired,
  price: PropTypes.arrayOf(PropTypes.number).isRequired,
  setPrice: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
      nameProduct: PropTypes.string.isRequired,
      categoryId: PropTypes.number.isRequired,
      materialId: PropTypes.number.isRequired,
      genderId: PropTypes.number.isRequired,
      zodiacId: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleDeleteChip: PropTypes.func.isRequired,
};

export default FilterComponent;
