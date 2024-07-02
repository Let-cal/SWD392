import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateProductModal from "./CreateProductController/CreateProductModal";
import FilterComponent from "./FilterManagement/FilterComponent";
import TableProduct from "./TableProduct";
const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [gender, setGender] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [price, setPrice] = useState([0, 5000000]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://zodiacjewerlyswd.azurewebsites.net/api/products?page=${page}&pageSize=${pageSize}`
      );
      const { data } = response.data;
      console.log(page);
      setProducts(data["list-data"]);
      setTotalPages(data["total-page"]);

      // Initialize price range after products are fetched
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const filterProducts = () => {
    let filtered = products;

    if (search) {
      filtered = filtered.filter((product) =>
        product["name-product"].toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(
        (product) => product["category-id"] === parseInt(category)
      );
    }

    if (material) {
      filtered = filtered.filter(
        (product) => product["material-id"] === parseInt(material)
      );
    }

    if (gender) {
      filtered = filtered.filter(
        (product) => product["gender-id"] === parseInt(gender)
      );
    }

    if (zodiac) {
      filtered = filtered.filter(
        (product) => product["zodiac-id"] === parseInt(zodiac)
      );
    }

    filtered = filtered.filter(
      (product) => product.price >= price[0] && product.price <= price[1]
    );

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, material, gender, zodiac, price, products]); // Thêm products vào dependencies để filter lại khi có sản phẩm mới

  const handleDeleteChip = (chipType) => {
    switch (chipType) {
      case "search":
        setSearch("");
        break;
      case "category":
        setCategory("");
        break;
      case "material":
        setMaterial("");
        break;
      case "gender":
        setGender("");
        break;
      case "zodiac":
        setZodiac("");
        break;
      case "price":
        setPrice([0, 50000]);
        break;
      default:
        break;
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPage(1); // Reset to first page when changing page size
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleProductCreate = () => {
    fetchProducts();
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-serif text-2xl font-bold">Product Management</h1>
          <div className="w-[100%]">
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              sx={{
                width: "100%",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "gray",
                },
              }}
              onClick={handleOpenModal}
            >
              Create Product
            </Button>
            <CreateProductModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onProductCreated={handleProductCreate}
            />
          </div>
        </div>

        <div className="flex items-end w-[30%]">
          {products && products.length > 0 && (
            <FilterComponent
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              material={material}
              setMaterial={setMaterial}
              gender={gender}
              setGender={setGender}
              zodiac={zodiac}
              setZodiac={setZodiac}
              price={price}
              setPrice={setPrice}
              products={products}
              handleDeleteChip={handleDeleteChip}
            />
          )}
        </div>
      </div>

      <section className="w-full mt-8">
        <TableProduct products={filteredProducts} onUpdate={fetchProducts} />

        <div className="flex justify-center mt-6">
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#b2b251",
                  color: "#fff",
                },
              }}
            />
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value={5}>5 per page</MenuItem>
              <MenuItem value={10}>10 per page</MenuItem>
              <MenuItem value={15}>15 per page</MenuItem>
            </Select>
          </Grid>
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
