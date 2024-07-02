import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

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
  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Order Number</StyledTableCell>
            <StyledTableCell align="center">User ID</StyledTableCell>
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
                <Button
                  variant="contained"
                  endIcon={<VisibilityIcon />}
                  sx={{
                    height: "20%",
                    fontSize: "13px",
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "gray",
                    },
                  }}
                >
                  View details
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

TableOrder.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default TableOrder;
