import { Box, Chip } from "@mui/material";
import PropTypes from "prop-types";

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
  const renderChips = () => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
      {search && (
        <Chip
          label={`Search: ${search}`}
          onDelete={() => handleDeleteChip("search")}
        />
      )}
      {category && (
        <Chip
          label={`Category: ${category}`}
          onDelete={() => handleDeleteChip("category")}
        />
      )}
      {material && (
        <Chip
          label={`Material: ${material}`}
          onDelete={() => handleDeleteChip("material")}
        />
      )}
      {gender && (
        <Chip
          label={`Gender: ${gender}`}
          onDelete={() => handleDeleteChip("gender")}
        />
      )}
      {zodiac && (
        <Chip
          label={`Zodiac: ${zodiac}`}
          onDelete={() => handleDeleteChip("zodiac")}
        />
      )}    
      {price[0] !== 0 ||
      price[1] !== Math.max(...products.map((p) => p.price)) ? (
        <Chip
          label={`Price: ${price[0]} - ${price[1]}`}
          onDelete={() => handleDeleteChip("price")}
        />
      ) : null}
    </Box>
  );

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
