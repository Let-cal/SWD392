import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import FilterComponent from "./FilterComponent";
import Table from "./TableProduct";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [gender, setGender] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [price, setPrice] = useState([0, 0]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://zodiacjewerly.azurewebsites.net/api/Product/GetAllProducts"
        );
        const fetchedProducts = response.data.data;
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);

        // Determine the maximum price for the slider
        const maxPrice = Math.max(...fetchedProducts.map((p) => p.price));
        setPrice([0, maxPrice]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search, category, material, gender, zodiac, price]);

  const filterProducts = () => {
    let filtered = products;

    if (search) {
      filtered = filtered.filter((product) =>
        product.nameProduct.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(
        (product) => product.categoryId === parseInt(category)
      );
    }

    if (material) {
      filtered = filtered.filter(
        (product) => product.materialId === parseInt(material)
      );
    }

    if (gender) {
      filtered = filtered.filter(
        (product) => product.genderId === parseInt(gender)
      );
    }

    if (zodiac) {
      filtered = filtered.filter(
        (product) => product.zodiacId === parseInt(zodiac)
      );
    }

    filtered = filtered.filter(
      (product) => product.price >= price[0] && product.price <= price[1]
    );

    setFilteredProducts(filtered);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="flex flex-row gap-4 w-full items-center justify-between">
        <h1 className="font-serif text-[30px] relative text-inherit leading-[48px] font-bold">
          Order Management
        </h1>
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
        />
      </div>
      <section className="w-full mt-8">
        {!loading && <Table data={filteredProducts} />}
      </section>
    </div>
  );
};

export default ProductPage;
