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
import OrderDetailsDialog from "../../../Admin/OrderManagement/OrderDetailsDialog";
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

const ProfileContent = ({ orders = [], loading }) => {
  const statusClasses = {
    COMPLETED: "text-green-600 font-bold",
    PROCESSING: "text-yellow-600 font-bold",
    CANCELLED: "text-red-600 font-bold",
  };

  const showOrdersTable = orders.length > 0;
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
        const UserId = localStorage.getItem("hint");
        const response = await Axios.get(`${API_BASE_URL}/customer/${UserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        });
        setOrderDetails(response.data.data.product);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching order details:", error);
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // Request was made but no response was received
          console.error("Request data:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
        }
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
    setOrderDetails([]);
    setLoaded(false);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : showOrdersTable ? (
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Order Number</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Total</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {order.orderNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">{order.date}</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className={statusClasses[order.status]}
                  >
                    {order.status}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {order.total}
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
      ) : (
        <div className="self-stretch bg-light-colors-light-gray-light flex flex-col items-end justify-start pt-px px-0 pb-[21px] box-border gap-[17px] max-w-full text-base text-light-colors-black-light">
          <div className="self-stretch h-[68px] relative bg-light-colors-light-gray-light hidden" />
          <div className="self-stretch h-0.5 relative box-border z-[1] border-t-[2px] border-solid border-light-colors-accent-light" />
          <div className="self-stretch flex flex-row items-start justify-end py-0 pr-[39px] pl-10 box-border max-w-full">
            <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq750:flex-wrap">
              <div className="w-[287px] relative leading-[27px] inline-block shrink-0 z-[1]">
                No orders available yet.
              </div>
              <a
                href="/customer-page"
                className="w-[148px] text-[15px] font-sans [border:none] [outline:none] bg-[transparent] h-[25px] flex flex-col items-start justify-start pt-1 px-0 pb-0 box-border font-px-heading-5 font-bold text-light-colors-accent-light"
              >
                BROWSE PRODUCT
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProfileContent.propTypes = {
  className: PropTypes.string,
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      orderNumber: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      total: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool.isRequired,
};

export default ProfileContent;
