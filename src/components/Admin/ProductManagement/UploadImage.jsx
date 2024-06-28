import { CloudUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const UploadImage = ({ productId, onGetAll }) => {
  const [open, setOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const pageSize = 4;

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://zodiacjewerlyswd.azurewebsites.net/api/image?page=${page}&pageSize=${pageSize}&search=${productId}`
      );
      const { "list-data": listData, "total-page": totalPages } =
        response.data.data;
      setImageUrls(listData || []);
      setTotalPages(totalPages || 1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchImages();
    }
  }, [open, page]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async (event) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setUploading(true);
      await axios.post(
        `https://zodiacjewerlyswd.azurewebsites.net/api/products/${productId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploading(false);
      onGetAll();
      fetchImages();
    } catch (error) {
      console.error("Error uploading images:", error);
      setUploading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="upload image">
        <CloudUpload />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="200px"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {imageUrls.map((image, index) => (
                <Grid item xs={6} key={index}>
                  <Box
                    component="img"
                    src={image["image-url"]}
                    alt={`product-${index}`}
                    sx={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              ))}
              {imageUrls.length < pageSize && (
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: "100%",
                      height: 0,
                      paddingBottom: "100%",
                      border: "2px dashed #ccc",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <input
                      type="file"
                      multiple
                      onChange={handleUpload}
                      style={{ display: "none" }}
                      id="upload-button"
                    />
                    <label
                      htmlFor="upload-button"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        cursor: "pointer",
                      }}
                    >
                      <CloudUpload
                        fontSize="large"
                        sx={{ fontSize: "200px" }}
                      />
                    </label>
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            color="primary"
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            color="primary"
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

UploadImage.propTypes = {
  productId: PropTypes.number.isRequired,
  onGetAll: PropTypes.func.isRequired,
};

export default UploadImage;
