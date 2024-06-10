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
                  <MenuItem value="Necklaces">Necklaces</MenuItem>
                  <MenuItem value="Bracelets">Bracelets</MenuItem>
                  <MenuItem value="Earrings">Earrings</MenuItem>
                  <MenuItem value="Rings">Rings</MenuItem>
                  <MenuItem value="Tshirt">Tshirt</MenuItem>
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
                  <MenuItem value="Gold">Gold</MenuItem>
                  <MenuItem value="Emeral">Emeral</MenuItem>
                  <MenuItem value="Diamonds">Diamonds</MenuItem>
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
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
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
                  <MenuItem value="Aries">Aries</MenuItem>
                  <MenuItem value="Taurus">Taurus</MenuItem>
                  <MenuItem value="Gemini">Gemini</MenuItem>
                  <MenuItem value="Cancer">Cancer</MenuItem>
                  <MenuItem value="Leo">Leo</MenuItem>
                  <MenuItem value="Virgo">Virgo</MenuItem>
                  <MenuItem value="Libra">Libra</MenuItem>
                  <MenuItem value="Scorpio">Scorpio</MenuItem>
                  <MenuItem value="Sagittarius">Sagittarius</MenuItem>
                  <MenuItem value="Capricorn">Capricorn</MenuItem>
                  <MenuItem value="Aquarius">Aquarius</MenuItem>
                  <MenuItem value="Pisces">Pisces</MenuItem>
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
};

export default FilterComponent;
