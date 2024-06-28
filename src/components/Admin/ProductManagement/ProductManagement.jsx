import SearchIcon from "@mui/icons-material/Search";
import {
  Backdrop,
  Button,
  CircularProgress,
  Pagination,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import TableProduct from "./TableProduct";
const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize, searchKeyword]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://zodiacjewerlyswd.azurewebsites.net/api/products?page=${page}&pageSize=${pageSize}&search=${searchKeyword}`
      );
      const { data } = response.data;

      setProducts(data["list-data"]);
      setTotalPages(data["total-page"]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPage(1); // Reset to first page when changing page size
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchKeyword(search);
    setPage(1); // Reset to first page when submitting search
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-serif text-2xl font-bold">Product Management</h1>
        <div className="flex items-end w-[30%]">
          <TextField
            id="search"
            label="Search"
            variant="standard"
            value={search}
            sx={{ width: "100%" }}
            onChange={handleSearchChange}
          />
          <Button
            variant="text"
            sx={{
              width: "20%",
              height: "50%",
              "&:hover": {
                transform: "scale(1.1)",
                transition: "transform 0.3s ease",
              },
            }}
            onClick={handleSearchSubmit}
            style={{ marginLeft: "10px" }}
          >
            <SearchIcon sx={{ color: "black" }} />
          </Button>
        </div>
      </div>
      <section className="w-full mt-8">
        <TableProduct products={products} onUpdate={fetchProducts} />
        <div className="flex justify-center mt-6">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
          </select>
        </div>
      </section>
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ProductManagement;
