import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useState } from "react";
import EditUserDialog from "./EditUserDialog";

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
  switch (status) {
    case 1:
      return "green";
    case 2:
      return "red";
    default:
      return "gray";
  }
};

const TableUser = ({ data, updateUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
  };

  return (
    <StyledTableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Full Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Telephone Number</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) &&
            data.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user["full-name"]}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {user.address || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user["telephone-number"] || "N/A"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user["role-name"]}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ color: getStatusColor(user.status) }}
                >
                  {user.status === 1 ? "Active" : "Inactive"}
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
                    onClick={() => handleViewDetails(user)}
                  >
                    View details
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {selectedUser && (
        <EditUserDialog
          open={true}
          handleClose={handleCloseDialog}
          userData={selectedUser}
          updateUser={updateUser}
        />
      )}
    </StyledTableContainer>
  );
};

TableUser.propTypes = {
  data: PropTypes.array.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default TableUser;
