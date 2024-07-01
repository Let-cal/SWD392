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
  Menu,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import AddProductPopup from "./AddProductPopup";
const ListItemButtons = ({
  onViewDetails,
  onViewProducts,
  onEdit,
  onDelete,
  collectionId,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // setOpen(!open); // Comment this line to prevent immediate opening
  };

  const handleSettingClick = () => {
    setOpen(!open); // Toggle the collapse open/close state only for Setting Collection
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false); // Close the collapse when menu is closed
  };
  const handleAddProductClick = () => {
    setPopupOpen(true);
    handleClose();
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleAddProduct = (productId) => {
    // Handle the added product logic here
    console.log("Added product ID:", productId);
    setPopupOpen(false);
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
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
        <MenuItem onClick={handleSettingClick}>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary="Setting Collection" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
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
      </Menu>
      <AddProductPopup
        open={popupOpen}
        onClose={handlePopupClose}
        collectionId={collectionId}
        onAddProduct={handleAddProduct}
      />
    </>
  );
};

ListItemButtons.propTypes = {
  onViewDetails: PropTypes.func.isRequired,
  onViewProducts: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default ListItemButtons;
