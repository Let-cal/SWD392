import {
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

const TableProduct = ({ products, onUpdate }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Material</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Zodiac</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <StyledTableRow key={product.id}>
              <StyledTableCell>{product.id}</StyledTableCell>
              <StyledTableCell>{product["name-product"]}</StyledTableCell>
              <StyledTableCell>
                {product["description-product"]}
              </StyledTableCell>
              <StyledTableCell>{product.price}</StyledTableCell>
              <StyledTableCell>{product.quantity}</StyledTableCell>
              <StyledTableCell>
                {getCategoryName(product["category-id"])}
              </StyledTableCell>
              <StyledTableCell>
                {getMaterialName(product["material-id"])}
              </StyledTableCell>
              <StyledTableCell>
                {getGenderName(product["gender-id"])}
              </StyledTableCell>
              <StyledTableCell>
                {getZodiacName(product["zodiac-id"])}
              </StyledTableCell>
              <StyledTableCell>
                <EditProductDialog product={product} onUpdate={onUpdate} />
                <UploadImage productId={product.id} onGetAll={onUpdate} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableProduct.propTypes = {
  products: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TableProduct;
