import { CloudUpload } from "@mui/icons-material";
import {
  Backdrop,
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
import { useEffect, useRef, useState } from "react";
import swal from "sweetalert";

const EditImage = ({ productId, onGetAll }) => {
  const [open, setOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const pageSize = 4;
  const fileInputRef = useRef(null);
  const fileInputUpdateRef = useRef(null); // Separate ref for update file input
  const API_BASE_URL = "https://zodiacjewerlyswd.azurewebsites.net";

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/api/image?page=${page}&pageSize=${pageSize}&search=${productId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { "list-data": listData, "total-page": totalPages } =
        response.data.data;
      setImageUrls(listData || []);
      setTotalPages(totalPages || 1);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
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
      setLoading(true);
      await axios.post(
        `${API_BASE_URL}/api/products/${productId}/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      swal("Good job!", "Image uploaded successfully!", "success");
      onGetAll();
      fetchImages();
    } catch (error) {
      console.error("Error uploading images:", error);
      swal("Error!", "Failed to upload image.", "error");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleImageClick = (imageId) => {
    if (!uploading) {
      const fileInput = fileInputUpdateRef.current;
      if (fileInput) {
        fileInput.onchange = async (event) => {
          const file = event.target.files[0];
          if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
              setUploading(true);
              setLoading(true);
              await axios.put(
                `${API_BASE_URL}/api/products/${productId}/images/${imageId}`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              swal("Good job!", "Image updated successfully!", "success");
              onGetAll();
              fetchImages();
            } catch (error) {
              console.error("Error updating image:", error);
              swal("Error!", "Failed to update image.", "error");
            } finally {
              setLoading(false);
              setUploading(false);
            }
          }
        };
        fileInput.click();
      }
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="edit images">
        <CloudUpload />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          Edit Images
          <div className="flex flex-row gap-2 items-center">
            <p className="text-[12px]">(Click here to upload new image!!!)</p>
            <IconButton
              onClick={() => fileInputRef.current.click()}
              aria-label="upload new image"
              sx={{ float: "right" }}
            >
              <CloudUpload />
            </IconButton>
          </div>
          <input
            type="file"
            multiple
            onChange={handleUpload}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputUpdateRef}
          />
        </DialogTitle>

        <DialogContent>
          {loading ? (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <Grid container spacing={2}>
              {imageUrls.map((image, index) => (
                <Grid item xs={6} key={index}>
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
                    onClick={() => fileInputRef.current.click()}
                  >
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

EditImage.propTypes = {
  productId: PropTypes.number.isRequired,
  onGetAll: PropTypes.func.isRequired,
};

export default EditImage;
