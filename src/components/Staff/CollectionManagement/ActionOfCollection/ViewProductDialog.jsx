import PanoramaIcon from "@mui/icons-material/Panorama";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";
import ViewImagesDialog from "./ViewImagesDialog"; // Import your new dialog component
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    transform: "scale(1.01)",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableContainer = styled(TableContainer)(() => ({
  overflow: "hidden",
}));

const ViewProductDialog = ({ open, onClose, products }) => {
  const [viewImagesOpen, setViewImagesOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState([]);

  const handleViewImages = (product) => {
    setSelectedProduct(product);
    setViewImagesOpen(true);
  };

  const handleCloseViewImages = () => {
    setViewImagesOpen(false);
    setSelectedProduct([]);
  };

  if (!open || !products) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Products in Collection</DialogTitle>
      <DialogContent sx={{ width: "100%", height: "100%" }}>
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <StyledTableContainer>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Product ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">View Images</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <StyledTableRow key={product.id}>
                    <StyledTableCell align="center">
                      {product.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {product["name-product"]}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {product["description-product"]}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {product.price}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        aria-label="view images"
                        onClick={() => handleViewImages(product)}
                      >
                        <PanoramaIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
      {/* Dialog for viewing product images */}
      <ViewImagesDialog
        open={viewImagesOpen}
        onClose={handleCloseViewImages}
        imageUrls={selectedProduct["image-urls"]}
      />
    </Dialog>
  );
};

ViewProductDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ViewProductDialog;
