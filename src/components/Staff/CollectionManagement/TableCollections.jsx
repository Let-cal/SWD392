import {
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
import deleteCollection from "./ActionOfCollection/DeleteAction.jsx";
import ListItemButtons from "./ActionOfCollection/ListItemButtonsDialog .jsx";
import ViewCollectionDialog from "./ActionOfCollection/ViewCollectionDialog";
import ViewProductDialog from "./ActionOfCollection/ViewProductDialog";
import EditCollectionDialog from "./EditCollectionDialog"; // Ensure the correct path

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

// eslint-disable-next-line no-unused-vars
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  overflow: "hidden",
}));

const getStatusColor = (status) => {
  return status === 1 ? "green" : "red";
};

const TableCollections = ({ data, onUpdateCollection }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [viewProductsOpen, setViewProductsOpen] = useState(false);

  const handleViewDetails = (collection) => {
    setSelectedCollection(collection);
    setViewOpen(true);
  };

  const handleEditCollection = (collection) => {
    setSelectedCollection(collection);
    setEditOpen(true);
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

  const handleDeleteCollection = async (collectionId) => {
    const confirmation = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this collection!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    });

    if (confirmation) {
      try {
        await deleteCollection(collectionId);
        swal("Poof! The collection has been deleted!", {
          icon: "success",
        });
        onUpdateCollection(); // Refresh the collections data
      } catch (error) {
        swal("Oops! Something went wrong!", {
          icon: "error",
        });
      }
    }
  };

  const handleCloseViewProducts = () => {
    setViewProductsOpen(false);
    setSelectedProducts([]);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedCollection(null);
  };

  const handleCloseView = () => {
    setViewOpen(false);
    setSelectedCollection(null);
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
            <StyledTableCell align="center">Action</StyledTableCell>
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
                <StyledTableCell
                  align="center"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={collection["image-collection"]}
                    alt={collection["name-collection"]}
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ListItemButtons
                    onViewDetails={() => handleViewDetails(collection)}
                    onViewProducts={() => handleViewProducts(collection.id)}
                    onEdit={() => handleEditCollection(collection)}
                    onDelete={() => handleDeleteCollection(collection.id)}
                    collectionId={collection.id}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {/* Dialogs */}
      <ViewCollectionDialog
        open={viewOpen}
        onClose={handleCloseView}
        collection={selectedCollection}
      />
      <ViewProductDialog
        open={viewProductsOpen}
        onClose={handleCloseViewProducts}
        products={selectedProducts}
      />
      {selectedCollection && (
        <EditCollectionDialog
          open={editOpen}
          onClose={handleCloseEdit}
          collection={selectedCollection}
          onSave={onUpdateCollection}
        />
      )}
    </StyledTableContainer>
  );
};

TableCollections.propTypes = {
  data: PropTypes.array.isRequired,
  onUpdateCollection: PropTypes.func.isRequired,
};

export default TableCollections;
