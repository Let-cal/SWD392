import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import FilterComponent from "./FilterManagement/FilterComponent";
import TableProduct from "./TableProduct";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [gender, setGender] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [price, setPrice] = useState([0, 0]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, material, gender, zodiac, price]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://zodiacjewerly.azurewebsites.net/api/products"
      );
      const fetchedProducts = response.data.data.map((product) => ({
        id: product.id,
        nameProduct: product["name-product"],
        descriptionProduct: product["description-product"],
        price: product.price,
        quantity: product.quantity,
        categoryId: product["category-id"],
        materialId: product["material-id"],
        genderId: product["gender-id"],
        imageURLs: product["image-urls"],
        zodiacId: product["zodiac-id"],
      }));

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
    setUpdating(true);
    try {
      if (!product.id) {
        throw new Error("Product ID is missing");
      }

      const payload = {
        id: product.id,
        "name-product": product.nameProduct || "",
        "description-product": product.descriptionProduct || "",
        price: product.price || 0,
        quantity: product.quantity || 0,
        "category-id": product.categoryId || 0,
        "material-id": product.materialId || 0,
        "gender-id": product.genderId || 0,
        "zodiac-id": product.zodiacId || 0,
      };

      const response = await axios.put(
        `https://zodiacjewerly.azurewebsites.net/api/products/${product.id}/zodiac/${product.zodiacId}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      const updatedProduct = response.data;
      enqueueSnackbar("Product updated successfully", { variant: "success" });
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );

      await fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      enqueueSnackbar("Error updating product", { variant: "error" });
    } finally {
      setUpdating(false);
    }
  };

  const deleteProduct = async (productId) => {
    setUpdating(true);
    try {
      await axios.delete(
        `https://zodiacjewerly.azurewebsites.net/api/products/${productId}`
      );

      setProducts((prev) => prev.filter((product) => product.id !== productId));
      setFilteredProducts((prev) =>
        prev.filter((product) => product.id !== productId)
      );

      enqueueSnackbar("Product deleted successfully", { variant: "success" });
    } catch (error) {
      console.error("Error deleting product:", error);
      enqueueSnackbar("Error deleting product", { variant: "error" });
    } finally {
      setUpdating(false);
    }
  };
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
        setPrice([0, Math.max(...products.map((p) => p.price))]);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || updating}
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
          handleDeleteChip={handleDeleteChip}
        />
      </div>
      <section className="w-full mt-8">
        {!loading && (
          <TableProduct
            data={filteredProducts}
            onUpdate={updateProduct}
            onDelete={deleteProduct}
            onGetAll={fetchProducts}
          />
        )}
      </section>
    </div>
  );
};

export default ProductPage;
