import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";


const StyledGridItem = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const ViewImagesDialog = ({ open, onClose, imageUrls }) => {
  if (!open || !imageUrls) return null;

  const handleImageClick = (imageId) => {
    // Handle image click action here if needed
    console.log(`Clicked image id: ${imageId}`);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>View Product Images</DialogTitle>
      <DialogContent>
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <Grid container spacing={2}>
            {imageUrls.map((image, index) => (
              <StyledGridItem item xs={6} key={index}>
                <Box
                  component="img"
                  src={image["image-url"]}
                  alt={`product-${index}`}
                  onClick={() => handleImageClick(image.id)}
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </StyledGridItem>
            ))}
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={onClose} color="primary">
          Close
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

ViewImagesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrls: PropTypes.array.isRequired,
};

export default ViewImagesDialog;
