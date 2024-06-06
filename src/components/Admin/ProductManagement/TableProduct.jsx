// TableProduct.jsx

import UpdateIcon from "@mui/icons-material/Update";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import InforProduct from "./InfoProduct";

const TableProduct = ({ data, onUpdate }) => {
  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex bg-gray-100 text-xs uppercase font-semibold text-gray-600">
        <div className="w-1/12 px-1 py-2">ID</div>
        <div className="flex w-11/12">
          <div className="w-1/5 px-1 py-2">Product name</div>
          <div className="w-1/5 px-1 py-2">Description</div>
          <div className="w-1/5 px-1 py-2">Price</div>
          <div className="w-1/5 px-1 py-2">Quantity</div>
          <div className="w-1/5 px-1 py-2">Category</div>
          <div className="w-1/5 px-1 py-2">Material</div>
          <div className="w-1/5 px-1 py-2">Gender</div>
          <div className="w-1/5 px-1 py-2">Zodiac</div>
        </div>
        <div className="w-1/12 px-1 py-2"></div>
      </div>
      <div className="h-96 overflow-auto">
        {data.map((product) => (
          <InforProduct
            key={product.id}
            product={product}
            onUpdate={onUpdate}
            Action={
              <Button
                id={`edit-button-${product.id}`}
                variant="outlined"
                size="medium"
                startIcon={<UpdateIcon />}
                onClick={() =>
                  document.getElementById(`edit-button-${product.id}`).click()
                }
              >
                Edit
              </Button>
            }
          />
        ))}
      </div>
    </div>
  );
};

TableProduct.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nameProduct: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      categoryId: PropTypes.number.isRequired, // Changed to number
      materialId: PropTypes.number.isRequired, // Changed to number
      genderId: PropTypes.number.isRequired, // Changed to number
      zodiacId: PropTypes.number.isRequired, // Changed to number
      descriptionProduct: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TableProduct;
