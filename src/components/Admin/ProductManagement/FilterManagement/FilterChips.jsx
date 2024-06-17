import { Box, Chip } from "@mui/material";
import PropTypes from "prop-types";
import {
  getCategoryName,
  getGenderName,
  getMaterialName,
  getZodiacName,
} from "../ChangeIDtoName";

const FilterChips = ({
  search,
  category,
  material,
  gender,
  zodiac,
  price,
  products,
  handleDeleteChip,
}) => {
  const renderChips = () => {
    const chips = [
      search && { label: `Search: ${search}`, key: "search" },
      category && {
        label: `Category: ${getCategoryName(category)}`,
        key: "category",
      },
      material && {
        label: `Material: ${getMaterialName(material)}`,
        key: "material",
      },
      gender && { label: `Gender: ${getGenderName(gender)}`, key: "gender" },
      zodiac && { label: `Zodiac: ${getZodiacName(zodiac)}`, key: "zodiac" },
      (price[0] !== 0 ||
        price[1] !== Math.max(...products.map((p) => p.price))) && {
        label: `Price: ${price[0]} - ${price[1]}`,
        key: "price",
      },
    ].filter(Boolean); // Loại bỏ các phần tử null hoặc undefined

    return (
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mb: 2 }}
      >
        {chips.map((chip) => (
          <Chip
            key={chip.key}
            label={chip.label}
            onDelete={() => handleDeleteChip(chip.key)}
          />
        ))}
      </Box>
    );
  };

  return renderChips();
};

FilterChips.propTypes = {
  search: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  material: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  zodiac: PropTypes.string.isRequired,
  price: PropTypes.arrayOf(PropTypes.number).isRequired,
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

export default FilterChips;
