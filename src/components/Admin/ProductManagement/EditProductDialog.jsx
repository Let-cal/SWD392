import { Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useState } from "react";
import { Material, categories, genders } from "./ChangeIDtoName";

const EditProductDialog = ({ product, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(product["name-product"]);
  const [description, setDescription] = useState(
    product["description-product"]
  );
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [categoryId, setCategoryId] = useState(product["category-id"]);
  const [materialId, setMaterialId] = useState(product["material-id"]);
  const [genderId, setGenderId] = useState(product["gender-id"]);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const updatedProduct = {
        id: product.id,
        "name-product": name,
        "description-product": description,
        price,
        quantity,
        "category-id": categoryId,
        "material-id": materialId,
        "gender-id": genderId,
      };

      await axios.put(
        `https://zodiacjewerlyswd.azurewebsites.net/api/products/${product.id}/zodiac/${product["zodiac-id"]}`,
        updatedProduct
      );
      enqueueSnackbar("Update product successful!!!", { variant: "success" });
      await onUpdate();
      handleClose();
    } catch (error) {
      enqueueSnackbar("Error updating product", { variant: "error" });
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="edit product">
        <Edit />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              label="Category"
            >
              {Object.entries(categories).map(([id, name]) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="material-label">Material</InputLabel>
            <Select
              labelId="material-label"
              id="material"
              value={materialId}
              onChange={(e) => setMaterialId(e.target.value)}
              label="Material"
            >
              {Object.entries(Material).map(([id, name]) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={genderId}
              onChange={(e) => setGenderId(e.target.value)}
              label="Gender"
            >
              {Object.entries(genders).map(([id, name]) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditProductDialog.propTypes = {
  product: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditProductDialog;
