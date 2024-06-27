import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";

import PropTypes from "prop-types";

const CreateCollectionDialog = ({
  open,
  onClose,
  onSuccess,
  enqueueSnackbar,
}) => {
  const [newCollection, setNewCollection] = useState({
    name: "",
    image: null,
    dateClose: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCreateCollection = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("NameCollection", newCollection.name);
      formData.append("ImageCollection", newCollection.image);
      formData.append("DateClose", newCollection.dateClose);

      const response = await axios.post(
        "https://zodiacjewerlyswd.azurewebsites.net/api/collections",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        enqueueSnackbar("Collection created successfully!", {
          variant: "success",
        });
        onSuccess(); // Refresh collections or handle success action
        onClose();
      } else {
        enqueueSnackbar("Failed to create collection", { variant: "error" });
      }
    } catch (error) {
      console.error("Error creating collection:", error);
      enqueueSnackbar("Failed to create collection", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    setNewCollection({
      ...newCollection,
      image: event.target.files[0],
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Collection</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={newCollection.name}
          onChange={(e) =>
            setNewCollection({ ...newCollection, name: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Date Close"
          fullWidth
          type="date"
          value={newCollection.dateClose}
          onChange={(e) =>
            setNewCollection({ ...newCollection, dateClose: e.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          style={{ marginTop: "16px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleCreateCollection}
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} /> : <AddCircleOutlineIcon />
          }
        >
          Create
        </Button>
      </DialogActions>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Dialog>
  );
};

CreateCollectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default CreateCollectionDialog;
