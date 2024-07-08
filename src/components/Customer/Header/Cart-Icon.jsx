import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ViewIcon from "@mui/icons-material/Visibility";
import { Box, Button, Drawer, List } from "@mui/material";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
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
      sx={{ width: 600 }} // Thay đổi giá trị width ở đây
      role="presentation"
      onClick={(event) => event.stopPropagation()} // Ngăn chặn sự kiện onClick lan truyền
      onKeyDown={(event) => event.stopPropagation()} // Ngăn chặn sự kiện onKeyDown lan truyền
    >
      <List
        sx={{
          maxHeight: "calc(100vh - 136px)", // Điều chỉnh giá trị này để chừa khoảng trống cho nút khác
          overflowY: "auto", // Cho phép cuộn dọc
        }}
      >
        <ViewCart />
      </List>
      <Divider
        style={{
          backgroundColor: "black",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Canh nút "View Detail" về bên phải
          position: "sticky",
          bottom: 0, // Đảm bảo nút "View Detail" luôn nằm ở dưới cùng
          backgroundColor: "white",
          padding: "10px", // Thêm khoảng đệm để nút không dính sát vào cạnh dưới
        }}
      >
        <Button
          className="checkout-button"
          onClick={handleChange}
          style={{
            color: "white",
            backgroundColor: "black",
            fontSize: "12px", // Chỉnh kích thước chữ nhỏ lại
            whiteSpace: "nowrap", // Đảm bảo chữ không bị xuống hàng
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
