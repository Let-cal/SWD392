import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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
import { useState } from "react";

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
}));

const StyledTableContainer = styled(TableContainer)(() => ({
  overflow: "hidden",
}));

const OrderDetailsDialog = ({ open, onClose, orderDetails }) => {
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent dividers>
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Zodiac Name</StyledTableCell>
                <StyledTableCell>Product Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Material</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>{" "}
                {/* New column for Action */}
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetails.map((product) => (
                <StyledTableRow key={product["product-id"]}>
                  <StyledTableCell>{product["product-id"]}</StyledTableCell>
                  <StyledTableCell>{product["zodiac-name"]}</StyledTableCell>
                  <StyledTableCell>{product["name-product"]}</StyledTableCell>
                  <StyledTableCell>
                    {product["description-product"]}
                  </StyledTableCell>
                  <StyledTableCell>{product["price"]}</StyledTableCell>
                  <StyledTableCell>{product["quantity"]}</StyledTableCell>
                  <StyledTableCell>{product["name-category"]}</StyledTableCell>
                  <StyledTableCell>{product["name-material"]}</StyledTableCell>
                  <StyledTableCell>{product["name-gender"]}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      onClick={() => handleImageClick(product["image-url"])}
                    >
                      <img
                        src={product["image-url"]}
                        alt={product["name-product"]}
                        style={{ width: 50 }}
                      />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
      <Dialog open={openImageDialog} onClose={handleCloseImageDialog}>
        <DialogContent>
          <img src={selectedImage} alt="Full size" style={{ width: "100%" }} />
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

OrderDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  orderDetails: PropTypes.array.isRequired,
};

export default OrderDetailsDialog;
