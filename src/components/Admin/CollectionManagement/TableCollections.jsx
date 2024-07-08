import ViewListIcon from "@mui/icons-material/ViewList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
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
import { format } from "date-fns";
import PropTypes from "prop-types";
import { useState } from "react";
import swal from "sweetalert";
import ViewCollectionDialog from "./ViewAction/ViewCollectionDialog";
import ViewProductDialog from "./ViewAction/ViewProductDialog"; // Import dialog for viewing products
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

const getStatusColor = (status) => {
  return status === 1 ? "green" : "red";
};

const TableCollections = ({ data }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [viewProductsOpen, setViewProductsOpen] = useState(false); // State for viewing products dialog
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]); // State for storing products

  const handleViewDetails = (collection) => {
    setSelectedCollection(collection);
    setViewOpen(true);
  };

  const handleViewProducts = async (collectionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://zodiacjewerlyswd.azurewebsites.net/api/collections/${collectionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const data = await response.json();
      const products = data.data.products;
      if (products.length === 0) {
        swal("No Products", "This collection has no products.", "warning");
      } else {
        setSelectedProducts(products);
        setViewProductsOpen(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCloseView = () => {
    setViewOpen(false);
    setSelectedCollection(null);
  };

  const handleCloseViewProducts = () => {
    setViewProductsOpen(false);
    setSelectedProducts([]);
  };

  return (
    <StyledTableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Collection Number</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Date Open</StyledTableCell>
            <StyledTableCell align="center">Date Close</StyledTableCell>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) &&
            data.map((collection) => (
              <StyledTableRow key={collection.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {collection.id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {collection["name-collection"]}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ color: getStatusColor(collection.status) }}
                >
                  {collection.status === 1 ? "Available" : "Unavailable"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {format(new Date(collection["date-open"]), "dd/MM/yyyy")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {format(new Date(collection["date-close"]), "dd/MM/yyyy")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <img
                    src={collection["image-collection"]}
                    alt={collection["name-collection"]}
                    style={{ width: "50px", height: "50px" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* IconButton for View details */}
                  <IconButton
                    aria-label="view details"
                    onClick={() => handleViewDetails(collection)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {/* IconButton for View products */}
                  <IconButton
                    aria-label="view products"
                    onClick={() => handleViewProducts(collection.id)}
                  >
                    <ViewListIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {/* Dialog for viewing collection details */}
      {selectedCollection && (
        <ViewCollectionDialog
          open={viewOpen}
          onClose={handleCloseView}
          collection={selectedCollection}
        />
      )}
      {/* Dialog for viewing products */}
      {selectedProducts.length > 0 && (
        <ViewProductDialog
          open={viewProductsOpen}
          onClose={handleCloseViewProducts}
          products={selectedProducts}
        />
      )}
    </StyledTableContainer>
  );
};

TableCollections.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TableCollections;
