import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import ViewListIcon from "@mui/icons-material/ViewList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import AddProductPopup from "./AddProductPopup";
import ViewProductDialog from "./ViewProductDialog";

const ListItemButtons = ({
  onViewDetails,
  onViewProducts,
  onEdit,
  onDelete,
  collectionId,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [viewProductsOpen, setViewProductsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [anchorOrigin, setAnchorOrigin] = useState({
    vertical: "bottom",
    horizontal: "right",
  });
  const [transformOrigin, setTransformOrigin] = useState({
    vertical: "top",
    horizontal: "right",
  });

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // View products in collection
  // Fetch products for a specific collection
  const fetchCollectionProducts = async (collectionId) => {
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
      setSelectedProducts(products);
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  // View products in collection
  const handleViewProducts = async (collectionId) => {
    const products = await fetchCollectionProducts(collectionId);
    if (products.length === 0) {
      swal("No Products", "This collection has no products.", "warning");
    } else {
      setViewProductsOpen(true);
    }
  };

  const fetchAllProducts = async () => {
    const token = localStorage.getItem("token");
    let allProductsData = [];
    let page = 1;
    let totalPages = 1;

    try {
      while (page <= totalPages) {
        const response = await fetch(
          `https://zodiacjewerlyswd.azurewebsites.net/api/products?page=${page}&pageSize=100`,
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
        const result = await response.json();
        const { data } = result;

        allProductsData = [...allProductsData, ...data["list-data"]];
        totalPages = data["total-page"];
        page++;
      }
      setAllProducts(allProductsData);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSettingsOpen(false); // Close the settings collapse when opening the menu
    adjustPopoverPosition(event.currentTarget, true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSettingsOpen(false); // Close the settings collapse when closing the menu
  };

  const handleSettingsClick = () => {
    const isOpening = !settingsOpen;
    setSettingsOpen(isOpening);
    if (isOpening) {
      adjustPopoverPosition(anchorEl, false);
    }
  };

  const handleAddProductClick = async () => {
    await fetchCollectionProducts(collectionId);
    setPopupOpen(true);
    handleClose();
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleCloseViewProducts = () => {
    setViewProductsOpen(false);
    setSelectedProducts([]);
  };

  const handleAddProduct = (productId) => {
    console.log("Added product ID:", productId);
    setPopupOpen(false);
  };

  const adjustPopoverPosition = (element, isInitialClick) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const offsetTop = rect.top;

    if (isInitialClick) {
      if (offsetTop > windowHeight / 1.5) {
        // Near bottom of the page
        setAnchorOrigin({
          vertical: "top",
          horizontal: "right",
        });
        setTransformOrigin({
          vertical: "bottom",
          horizontal: "right",
        });
      } else {
        // Near top of the page
        setAnchorOrigin({
          vertical: "bottom",
          horizontal: "right",
        });
        setTransformOrigin({
          vertical: "top",
          horizontal: "right",
        });
      }
    }
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Popover
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onViewDetails();
          }}
        >
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          <ListItemText primary="View Details" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onViewProducts();
          }}
        >
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="View Products" />
        </MenuItem>
        <MenuItem onClick={handleSettingsClick}>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary="Setting Collection" />
          {settingsOpen ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4, display: "flex", flexDirection: "row", gap: "5px" }}
              onClick={onEdit}
            >
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Collection" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, display: "flex", flexDirection: "row", gap: "5px" }}
              onClick={handleAddProductClick}
            >
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add more product" />
            </ListItemButton>
          </List>
        </Collapse>
        <MenuItem
          onClick={() => {
            handleClose();
            onDelete();
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Delete Collection" />
        </MenuItem>
      </Popover>
      <ViewProductDialog
        open={viewProductsOpen}
        onClose={handleCloseViewProducts}
        products={selectedProducts}
      />
      <AddProductPopup
        open={popupOpen}
        onClose={handlePopupClose}
        collectionId={collectionId}
        onAddProduct={handleAddProduct}
        allProducts={allProducts}
        AddThenViewProduct={handleViewProducts}
        selectedProducts={selectedProducts}
      />
    </>
  );
};

ListItemButtons.propTypes = {
  onViewDetails: PropTypes.func.isRequired,
  onViewProducts: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  AddThenViewProduct: PropTypes.func,
  collectionId: PropTypes.number.isRequired,
};

export default ListItemButtons;
