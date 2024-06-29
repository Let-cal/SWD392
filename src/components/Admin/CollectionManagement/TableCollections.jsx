// TableCollections.jsx

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const getStatusColor = (status) => {
  return status === 1 ? "green" : "red";
};

const TableCollections = ({ data }) => {
  return (
    <TableContainer component={Paper}>
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
                  {collection["date-open"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {collection["date-close"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <img
                    src={collection["image-collection"]}
                    alt={collection["name-collection"]}
                    style={{ width: "50px", height: "50px" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    endIcon={<VisibilityIcon />}
                    sx={{
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
    </TableContainer>
  );
};

TableCollections.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TableCollections;