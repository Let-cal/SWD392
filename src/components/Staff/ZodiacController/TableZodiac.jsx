import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useState } from "react";
import EditZodiacDialog from "./EditZodiacDialog";

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

const TableZodiac = ({ data, onUpdate }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedZodiac, setSelectedZodiac] = useState(null);

  const handleViewDetails = (zodiac) => {
    setSelectedZodiac(zodiac);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <StyledTableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Zodiac Number</StyledTableCell>
            <StyledTableCell align="center">Zodiac Name</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((zodiac) => (
            <StyledTableRow key={zodiac.id}>
              <StyledTableCell component="th" scope="row">
                {zodiac.id}
              </StyledTableCell>
              <StyledTableCell align="center">
                {zodiac["name-zodiac"]}
              </StyledTableCell>
              <StyledTableCell align="center">
                {zodiac["des-zodiac"]}
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
                  onClick={() => handleViewDetails(zodiac)}
                >
                  View details
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {selectedZodiac && (
        <EditZodiacDialog
          open={openDialog}
          onClose={handleCloseDialog}
          zodiacId={selectedZodiac.id}
          initialDes={selectedZodiac["des-zodiac"]}
          onUpdate={onUpdate}
        />
      )}
    </StyledTableContainer>
  );
};

TableZodiac.propTypes = {
  data: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TableZodiac;
