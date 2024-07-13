import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ViewIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Drawer,
  List,
  IconButton,
  Badge,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ViewCart from "../StepperControllerCart/view-cart/ViewCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CartIcon() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("hint");
    axios
      .get(
        `https://zodiacjewerlyswd.azurewebsites.net/api/orders/customer/${userId}`
      )
      .then((response) => {
        if (response.data && response.data.data && response.data.data.product) {
          setCartItemCount(response.data.data.product.length);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the cart data!", error);
      });
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      setDrawerOpen(false);
    }
  };

  const handleChange = () => {
    navigate("/ViewCartDetails");
  };

  const drawerList = (
    <Box
      sx={{ width: 600 }}
      role="presentation"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <List
        sx={{
          maxHeight: "calc(100vh - 136px)",
          overflowY: "auto",
        }}
      >
        <ViewCart />
      </List>
      <Divider style={{ backgroundColor: "black" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <Button
          className="checkout-button"
          onClick={handleChange}
          style={{
            color: "white",
            backgroundColor: "black",
            fontSize: "12px",
            whiteSpace: "nowrap",
            "&:hover": { backgroundColor: "gray" },
          }}
          startIcon={<ViewIcon />}
        >
          View Detail
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
        <StyledBadge badgeContent={cartItemCount} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        BackdropProps={{ onClick: handleBackdropClick }}
      >
        {drawerList}
      </Drawer>
    </>
  );
}
