import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ViewIcon from "@mui/icons-material/Visibility";
import { Box, Button, Drawer, List } from "@mui/material";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import React from "react";
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
  const handleChange = () => {
    navigate("/ViewCartDetails");
  };
  const [drawerOpen, setDrawerOpen] = React.useState(false);

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

  const drawerList = (
    <Box
      sx={{ width: 400 }} // Thay đổi giá trị width ở đây
      role="presentation"
      onClick={(event) => event.stopPropagation()} // Ngăn chặn sự kiện onClick lan truyền
      onKeyDown={(event) => event.stopPropagation()} // Ngăn chặn sự kiện onKeyDown lan truyền
    >
      <List>
        <ViewCart />
        <div className="mr-4 relative">
          <Button
            className="checkout-button"
            onClick={handleChange}
            style={{
              color: "white",
              backgroundColor: "black",
              position: "absolute",
              right: 0,
              "&:hover": { backgroundColor: "gray" },
            }}
            startIcon={<ViewIcon />}
          >
            View Detail
          </Button>
        </div>
      </List>
    </Box>
  );

  return (
    <>
      <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
        <StyledBadge badgeContent={4} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        BackdropProps={{
          onClick: handleBackdropClick,
        }}
      >
        {drawerList}
      </Drawer>
    </>
  );
}
