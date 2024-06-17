import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import { useState } from "react";
import InforProduct from "./InfoProduct";

const TableProduct = ({ data, onUpdate, onDelete, onGetAll }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleMenuOpen = (event, productId) => {
    setAnchorEl(event.currentTarget);
    setSelectedProductId(productId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProductId(null);
  };

  const handleEditClick = () => {
    document.getElementById(`edit-button-${selectedProductId}`).click();
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    onDelete(selectedProductId);
    handleMenuClose();
  };

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-gray-100 text-xs uppercase font-semibold text-gray-600">
        <div className="w-1/12 px-1  py-2">ID</div>
        <div className="w-1/12 px-1 py-2">Product name</div>
        <div className="w-1/12 px-1 py-2">Description</div>
        <div className="w-1/12 px-1 py-2">Price</div>
        <div className="w-1/12 px-1 py-2">Quantity</div>
        <div className="w-1/12 px-1 py-2">Category</div>
        <div className="w-1/12 px-1 py-2">Material</div>
        <div className="w-1/12 px-1 py-2">Gender</div>
        <div className="w-1/12 px-1 py-2">Zodiac</div>
        <div className="w-1/12 px-1 py-2">ImgURL</div>
        <div className="w-1/12 px-1 py-2">Action</div>
      </div>
      <div className="h-[500px] overflow-auto">
        {data.map((product) => (
          <InforProduct
            key={product.id}
            product={product}
            onUpdate={onUpdate}
            onGetAll={onGetAll}
            Action={
              <>
                <Button
                  id={`edit-button-${product.id}`}
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "gray",
                    },
                  }}
                  size="large"
                  startIcon={<UpdateIcon />}
                  onClick={(event) => handleMenuOpen(event, product.id)}
                >
                  Edit
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedProductId === product.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleEditClick}>
                    <UpdateIcon className="mr-2" /> Update
                  </MenuItem>
                  <MenuItem onClick={handleDeleteClick}>
                    <DeleteIcon className="mr-2" /> Delete
                  </MenuItem>
                </Menu>
              </>
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
  onDelete: PropTypes.func.isRequired,
  onGetAll: PropTypes.func.isRequired,
};

export default TableProduct;
