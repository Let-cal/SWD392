import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Pagination,
  Select,
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
  allProducts,
  AddThenViewProduct,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (open) {
      // Calculate pagination based on the number of allProducts
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      setProducts(allProducts.slice(start, end));
      setTotalPages(Math.ceil(allProducts.length / pageSize));
      setLoading(false);
    }
  }, [open, page, pageSize, allProducts]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    const size = Number(event.target.value);
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
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        AddThenViewProduct(collectionId);
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
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <TableProduct
              products={products}
              onAddProduct={handleAddProduct}
              showAddButton
            />
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
                sx={{
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#b2b251",
                    color: "#fff",
                  },
                }}
              />
              <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                sx={{ minWidth: 120 }}
              >
                <MenuItem value={5}>5 per page</MenuItem>
                <MenuItem value={10}>10 per page</MenuItem>
                <MenuItem value={15}>15 per page</MenuItem>
              </Select>
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddProductPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  collectionId: PropTypes.number.isRequired,
  onAddProduct: PropTypes.func.isRequired,
  AddThenViewProduct: PropTypes.func.isRequired,
  allProducts: PropTypes.array.isRequired,
};

export default AddProductPopup;
