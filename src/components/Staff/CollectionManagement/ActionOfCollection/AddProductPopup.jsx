import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import TableProduct from "../../ProductManagement/TableProduct";

const AddProductPopup = ({
  open,
  onClose = () => {},
  collectionId,
  onAddProduct,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (open) {
      fetchProducts();
    }
  }, [open, page, pageSize]);

  const fetchProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://zodiacjewerlyswd.azurewebsites.net/api/products?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const result = await response.json();
      const { data } = result;

      setProducts(data["list-data"]);
      setTotalPages(data["total-page"]);
    } catch (error) {
      setError("Error fetching products.");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPage(1); // Reset to first page when changing page size
  };

  const handleAddProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://zodiacjewerlyswd.azurewebsites.net/api/collections/${collectionId}/products/${productId}`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
          },
        }
      );

      if (response.ok) {
        onAddProduct(productId);
      } else {
        throw new Error("Failed to add product.");
      }
    } catch (error) {
      setError("Error adding product.");
      console.error("Error adding product:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Product to Collection</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableProduct
            products={products}
            onAddProduct={handleAddProduct}
            showAddButton
          />
        )}
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={15}>15 per page</option>
        </select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

AddProductPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  collectionId: PropTypes.number.isRequired,
  onAddProduct: PropTypes.func.isRequired,
};

export default AddProductPopup;
