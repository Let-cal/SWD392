import VisibilityIcon from "@mui/icons-material/Visibility";
import {
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
import Axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import OrderDetailsDialog from "./OrderDetailsDialog";

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

const TableOrder = ({ orders }) => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const API_BASE_URL = "https://zodiacjewerlyswd.azurewebsites.net/api/orders";

  const handleViewDetails = async (order) => {
    setSelectedOrder(order);
    setOpen(true);

    if (!loaded) {
      try {
        const token = localStorage.getItem("token");
        const response = await Axios.get(
          `${API_BASE_URL}/order/${order.OrderNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "*/*",
            },
          }
        );
        setOrderDetails(response.data.data.product);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
    setOrderDetails([]);
    setLoaded(false);
  };

  console.log("Orders:", orders);

  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Order Number</StyledTableCell>
            <StyledTableCell align="center">User ID</StyledTableCell>
            <StyledTableCell align="center">User Name</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Total Price</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order.OrderNumber}>
              <StyledTableCell align="center">
                {order.OrderNumber}
              </StyledTableCell>
              <StyledTableCell align="center">{order.UserID}</StyledTableCell>
              <StyledTableCell align="center">{order.UserName}</StyledTableCell>
              <StyledTableCell align="center">{order.Date}</StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ color: order.StatusColor }}
              >
                {order.Status}
              </StyledTableCell>
              <StyledTableCell align="center">
                {order.TotalPrice}
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton onClick={() => handleViewDetails(order)}>
                  <VisibilityIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {selectedOrder && (
        <OrderDetailsDialog
          open={open}
          onClose={handleClose}
          orderDetails={orderDetails}
        />
      )}
    </StyledTableContainer>
  );
};

TableOrder.propTypes = {
  orders: PropTypes.array.isRequired,
  OnEdit: PropTypes.func.isRequired,
};

export default TableOrder;
