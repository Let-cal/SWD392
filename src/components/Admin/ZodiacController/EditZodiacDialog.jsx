import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const EditZodiacDialog = ({
  open,
  onClose,
  zodiacId,
  initialDes,
  onUpdate,
}) => {
  const [description, setDescription] = useState(initialDes);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setDescription(initialDes);
  }, [initialDes]);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "https://zodiacjewerlyswd.azurewebsites.net/api/zodiacs",
        {
          id: zodiacId,
          "des-zodiac": description,
        }
      );
      console.log("Update Response:", response.data);
      await onUpdate(); // Call onUpdate function passed as prop
      enqueueSnackbar(response.data.message, { variant: "success" });
      onClose(true); // Close dialog and possibly refresh data
    } catch (error) {
      console.error("Update Error:", error);
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} fullWidth maxWidth="sm">
      <DialogTitle>Edit Zodiac Description</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="des-zodiac"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditZodiacDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  zodiacId: PropTypes.string.isRequired,
  initialDes: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditZodiacDialog;
