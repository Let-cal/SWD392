import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const getStatusColor = (status) => {
  return status === 1 ? "green" : "red";
};

const ViewCollectionDialog = ({ open, onClose, collection }) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage("");
  };

  if (!open || !collection) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Collection Details</DialogTitle>
      <DialogContent>
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    {" "}
                    <strong>Title</strong>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <strong>Data</strong>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" align="center">
                    Collection Number
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {collection.id}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" align="center">
                    Name
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {collection["name-collection"]}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" align="center">
                    Status
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    style={{ color: getStatusColor(collection.status) }}
                  >
                    {collection.status === 1 ? "Available" : "Unavailable"}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" align="center">
                    Date Open
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {collection["date-open"]}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" align="center">
                    Date Close
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {collection["date-close"]}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" align="center">
                    Image{" "}
                    <p className="text-sm text-gray-400">
                      (To view, click the image !!!)
                    </p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <img
                      src={collection["image-collection"]}
                      alt={collection["name-collection"]}
                      style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleImageClick(collection["image-collection"])
                      }
                    />
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
      <ImageModal
        open={imageModalOpen}
        onClose={handleCloseImageModal}
        imageSrc={selectedImage}
      />
    </Dialog>
  );
};

ViewCollectionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  collection: PropTypes.object,
};

const ImageModal = ({ open, onClose, imageSrc }) => {
  if (!open || !imageSrc) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent>
        <img src={imageSrc} alt="Zoomed Image" style={{ width: "100%" }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ImageModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default ViewCollectionDialog;
