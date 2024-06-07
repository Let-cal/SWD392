import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import FilterComponent from "./FilterComponent";
import TableProduct from "./TableProduct";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // Thêm trạng thái updating
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [gender, setGender] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [price, setPrice] = useState([0, 0]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search, category, material, gender, zodiac, price]);

  const fetchProducts = async () => {
    setLoading(true); // Đặt trạng thái loading
    try {
      const response = await axios.get(
        "https://zodiacjewerly.azurewebsites.net/api/Product/GetAllProducts"
      );
      const fetchedProducts = response.data.data;
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);

      const maxPrice = Math.max(...fetchedProducts.map((p) => p.price));
      setPrice([0, maxPrice]);
    } catch (error) {
      console.error("Error fetching products:", error);

      if (!error.response) {
        enqueueSnackbar(
          "Network error: Unable to connect to the server. Please check your internet connection.",
          { variant: "error" }
        );
      } else {
        enqueueSnackbar("Error fetching products", { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

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

  const updateProduct = async (product) => {
    setUpdating(true); // Đặt trạng thái updating
    try {
      if (!product.id) {
        throw new Error("Product ID is missing");
      }

      const payload = {
        id: product.id,
        nameProduct: product.nameProduct || "",
        descriptionProduct: product.descriptionProduct || "",
        price: product.price || 0,
        quantity: product.quantity || 0,
        categoryId: product.categoryId || 0,
        materialId: product.materialId || 0,
        genderId: product.genderId || 0,
        zodiacId: product.zodiacId || 0,
      };

      const response = await axios.put(
        `https://zodiacjewerly.azurewebsites.net/api/Product/UpdateProduct/${product.id}?zodiacId=${product.zodiacId}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      const updatedProduct = response.data;

      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );

      // Cập nhật dữ liệu sản phẩm
      await fetchProducts();

      // Thông báo thành công
      enqueueSnackbar("Product updated successfully", { variant: "success" });
    } catch (error) {
      console.error("Error updating product:", error);
      enqueueSnackbar("Error updating product", { variant: "error" });
    } finally {
      setUpdating(false); // Tắt trạng thái updating
    }
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || updating} // Kết hợp trạng thái loading và updating
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="flex flex-row gap-4 w-full items-center justify-between">
        <h1 className="font-serif text-[30px] relative text-inherit leading-[48px] font-bold">
          Product Management
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
        {!loading && (
          <TableProduct data={filteredProducts} onUpdate={updateProduct} />
        )}
      </section>
    </div>
  );
};

export default ProductPage;
