import UpdateIcon from "@mui/icons-material/Update";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import {
  getCategoryName,
  getGenderName,
  getZodiacName,
} from "./ChangeIDtoName";
import InforProduct from "./InfoProduct";

const Table = ({ data }) => {
  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex bg-gray-100 text-xs uppercase font-semibold text-gray-600">
        <div className="w-1/12 px-4 py-2">ID</div>
        <div className="w-1/5 px-4 py-2">Product name</div>
        <div className="w-1/5 px-4 py-2">Price</div>
        <div className="w-1/5 px-4 py-2">Category</div>
        <div className="w-1/5 px-4 py-2">Material ID</div>
        <div className="w-1/5 px-4 py-2">Gender</div>
        <div className="w-1/5 px-4 py-2">Zodiac</div>
        <div className="w-1/5 px-4 py-2">Action</div>
      </div>
      {Array.isArray(data) &&
        data.map((product, index) => (
          <InforProduct
            key={product.id}
            ProductNumber={index + 1}
            nameProduct={product.nameProduct}
            Price={product.price.toString()}
            Category={getCategoryName(product.categoryId)}
            materialId={product.materialId.toString()}
            Gender={getGenderName(product.genderId)}
            Zodiac={getZodiacName(product.zodiacId)}
            Action={
              <Button
                variant="contained"
                endIcon={<UpdateIcon />}
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "gray",
                  },
                }}
              >
                Update
              </Button>
            }
          />
        ))}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Table;
