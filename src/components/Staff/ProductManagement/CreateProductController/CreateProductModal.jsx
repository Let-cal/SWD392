import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  NameCategories,
  NameGenders,
  NameMaterials,
  NameZodiacs,
  getCategoryID,
  getGenderID,
  getMaterialID,
  getZodiacID,
} from "../ChangeIDtoName";

const CreateProductModal = ({ isOpen, onClose, onProductCreated }) => {
  const [formData, setFormData] = useState({
    nameProduct: "",
    descriptionProduct: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    materialId: "",
    genderId: "",
    zodiacId: "",
  });

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      nameProduct,
      descriptionProduct,
      price,
      quantity,
      categoryId,
      materialId,
      genderId,
      zodiacId,
    } = formData;

    const requestData = {
      id: 0,
      "name-product": nameProduct,
      "description-product": descriptionProduct,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      "category-id": getCategoryID(categoryId),
      "material-id": getMaterialID(materialId),
      "gender-id": getGenderID(genderId),
    };
    const zodiacIdValue = getZodiacID(zodiacId);

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        enqueueSnackbar("Authentication token is missing", {
          variant: "error",
        });
        return;
      }

      const response = await axios.post(
        `https://zodiacjewerly.azurewebsites.net/api/products?zodiacId=${zodiacIdValue}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      enqueueSnackbar("Product created successfully", {
        variant: "success",
      });
      const newProduct = response.data;
      onProductCreated(newProduct); // Call the function passed as a prop
      onClose();
    } catch (error) {
      console.error("Error:", error.response?.data);
      enqueueSnackbar(
        error.response?.data?.message || "Failed to create product",
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create Product</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nameProduct"
            label="Product Name"
            type="text"
            fullWidth
            required
            variant="outlined"
            name="nameProduct"
            value={formData.nameProduct}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="descriptionProduct"
            label="Description"
            type="text"
            fullWidth
            required
            variant="outlined"
            name="descriptionProduct"
            value={formData.descriptionProduct}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            required
            variant="outlined"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            required
            variant="outlined"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense" variant="outlined" required>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={formData.categoryId}
              onChange={handleChange}
              name="categoryId"
            >
              {Object.keys(NameCategories).map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" variant="outlined" required>
            <InputLabel>Material</InputLabel>
            <Select
              label="Material"
              value={formData.materialId}
              onChange={handleChange}
              name="materialId"
            >
              {Object.keys(NameMaterials).map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" variant="outlined" required>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              value={formData.genderId}
              onChange={handleChange}
              name="genderId"
            >
              {Object.keys(NameGenders).map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" variant="outlined" required>
            <InputLabel>Zodiac</InputLabel>
            <Select
              label="Zodiac"
              value={formData.zodiacId}
              onChange={handleChange}
              name="zodiacId"
            >
              {Object.keys(NameZodiacs).map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Create Product"}
          </Button>
        </DialogActions>
      </form>
      <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};

CreateProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onProductCreated: PropTypes.func.isRequired,
};

export default CreateProductModal;
