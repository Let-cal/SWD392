import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const EditCollectionDialog = ({ open, onClose, collection, onSave }) => {
  const [formData, setFormData] = useState({ ...collection });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setFormData({
      ...collection,
      "date-close": collection["date-close"]
        ? format(parseISO(collection["date-close"]), "yyyy-MM-dd")
        : "",
    });
    setImagePreview(collection["image-collection"]);
  }, [collection]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("NameCollection", formData["name-collection"]);

    if (formData["date-close"]) {
      const dateClose = new Date(formData["date-close"]);
      const formattedDateClose = format(dateClose, "MM/dd/yyyy");
      form.append("DateClose", formattedDateClose);
    }

    // Check if selectedFile is null
    if (selectedFile) {
      form.append("ImageCollection", selectedFile);
    } else {
      // Fetch the image file from the URL and append to form
      try {
        const response = await fetch(formData["image-collection"]);
        const blob = await response.blob();
        const file = new File([blob], "image-collection.png", {
          type: blob.type,
        });
        form.append("ImageCollection", file);
      } catch (error) {
        console.error("Error fetching image:", error);
        enqueueSnackbar("Error fetching image. Please try again.", {
          variant: "error",
        });
        setLoading(false);
        return;
      }
    }

    console.log(formData); // Log the formData object to verify fields
    console.log(...form); // Log the FormData object to verify fields

    const token = localStorage.getItem("token");
    if (!token) {
      enqueueSnackbar("Authentication token is missing", {
        variant: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://zodiacjewerlyswd.azurewebsites.net/api/collections/${collection.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
          body: form,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const result = await response.json();
      onSave(result);
      setLoading(false);
      onClose();
      swal("Good job!", "Collection updated successfully!", "success");
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("Error updating collection. Please try again.", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Collection</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name-collection"
          label="Name Collection"
          type="text"
          fullWidth
          value={formData["name-collection"]}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="date-close"
          label="Date Close"
          type="date"
          fullWidth
          value={formData["date-close"] ? formData["date-close"] : ""}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          {imagePreview && (
            <img
              src={imagePreview}
              alt={formData["name-collection"]}
              style={{
                width: "100px",
                height: "100px",
                display: "block",
                margin: "0 auto",
              }}
            />
          )}
          <input
            accept="image/*"
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <IconButton color="primary" component="span">
              <CloudUploadIcon />
            </IconButton>
            <span>Change Image</span>
          </label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditCollectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  collection: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditCollectionDialog;
