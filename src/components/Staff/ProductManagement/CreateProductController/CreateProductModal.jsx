import {
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
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
import Input from "./InputForm";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
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
      nameProduct,
      descriptionProduct,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      categoryId: getCategoryID(categoryId),
      materialId: getMaterialID(materialId),
      genderId: getGenderID(genderId),
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
        `https://zodiacjewerly.azurewebsites.net/api/Product/CreateProduct?zodiacId=${zodiacIdValue}`,
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

  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button onClick={onClose} style={modalStyles.closeButton}>
          X
        </button>
        <h2 className="font-bold mb-4 text-2xl font-serif">Create Product</h2>
        <form onSubmit={handleSubmit}>
          <Input
            Content="Product Name"
            Placeholder="Enter the product name"
            propMinWidth="200px"
            name="nameProduct"
            onChange={handleChange}
          />
          <Input
            Content="Description"
            Placeholder="Enter the product description"
            propMinWidth="200px"
            name="descriptionProduct"
            onChange={handleChange}
          />
          <Input
            Content="Price"
            Placeholder="Enter the product price"
            propMinWidth="200px"
            name="price"
            inputType="number"
            onChange={handleChange}
          />
          <Input
            Content="Quantity"
            Placeholder="Enter the product quantity"
            propMinWidth="200px"
            name="quantity"
            inputType="number"
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.categoryId}
              name="categoryId"
              onChange={handleSelectChange}
            >
              {Object.keys(NameCategories).map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Material</InputLabel>
            <Select
              value={formData.materialId}
              name="materialId"
              onChange={handleSelectChange}
            >
              {Object.keys(NameMaterials).map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.genderId}
              name="genderId"
              onChange={handleSelectChange}
            >
              {Object.keys(NameGenders).map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Zodiac</InputLabel>
            <Select
              value={formData.zodiacId}
              name="zodiacId"
              onChange={handleSelectChange}
            >
              {Object.keys(NameZodiacs).map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button type="submit" style={modalStyles.submitButton}>
            Create Product
          </button>
        </form>
        <Backdrop style={{ color: "#fff", zIndex: 1000 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
};

CreateProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onProductCreated: PropTypes.func.isRequired,
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  submitButton: {
    background: "#000",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default CreateProductModal;
