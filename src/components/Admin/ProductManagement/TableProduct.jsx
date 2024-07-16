import AddIcon from "@mui/icons-material/Add";
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
import PropTypes from "prop-types";
import {
  getCategoryName,
  getGenderName,
  getMaterialName,
  getZodiacName,
} from "./ChangeIDtoName";
import UploadImage from "./EditImage";
import EditProductDialog from "./EditProductDialog";

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

const StyledTableRow = styled(TableRow)(({ theme, soldOut }) => ({
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
  ...(soldOut && {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[600],
    textDecoration: "line-through 2px",
    fontWeight: "bold",
  }),
}));

const SoldOutText = styled("span")(() => ({
  display: "inline-block",
  width: "100%",
  textAlign: "center",
  position: "relative",
  color: "red",
  fontWeight: "bold",
}));

const StyledTableContainer = styled(TableContainer)(() => ({
  overflow: "hidden",
}));

const TableProduct = ({
  products = [],
  onUpdate,
  onAddProduct,
  showAddButton = false,
}) => {
  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Category</StyledTableCell>
            <StyledTableCell align="center">Material</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">Zodiac</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(products) &&
            products.map((product) => (
              <StyledTableRow key={product.id} soldOut={product.quantity === 0}>
                <StyledTableCell align="center">{product.id}</StyledTableCell>
                <StyledTableCell align="center">
                  {product["name-product"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product["description-product"]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.price}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.quantity === 0 ? (
                    <SoldOutText>Sold out</SoldOutText>
                  ) : (
                    product.quantity
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {getCategoryName(product["category-id"])}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {getMaterialName(product["material-id"])}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {getGenderName(product["gender-id"])}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {getZodiacName(product["zodiac-id"])}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {showAddButton ? (
                    <IconButton
                      onClick={() => onAddProduct(product.id)}
                      color="primary"
                    >
                      <AddIcon />
                    </IconButton>
                  ) : (
                    <>
                      <EditProductDialog
                        product={product}
                        onUpdate={onUpdate}
                      />
                      <UploadImage productId={product.id} onGetAll={onUpdate} />
                    </>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

TableProduct.propTypes = {
  products: PropTypes.array.isRequired,
  onUpdate: PropTypes.func,
  onAddProduct: PropTypes.func,
  showAddButton: PropTypes.bool,
};

export default TableProduct;
