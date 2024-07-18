import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../Header/CartIconController/CartContext";
import Header from "../Header/header";
import "./detail-product.css";
const ProductImage = ({ src, alt, index, onClick, isSelected }) => (
  <img
    className={`product-image ${isSelected ? "selected" : ""}`}
    src={src}
    alt={alt}
    onClick={() => onClick(index)}
  />
);

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const SimilarProduct = ({ imageSrc, name, price, product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/DetailProduct/${product.id}`, { state: { product } });
    window.location.reload();
  };

  return (
    <div className="similar-product" onClick={handleClick}>
      <img className="similar-product-image" src={imageSrc} alt={name} />
      <div className="similar-product-name">{name}</div>
      <div className="similar-product-price">
        <span className="currency">$</span>
        <span className="price">{formatPrice(price)}</span>
      </div>
    </div>
  );
};

const categoryMap = {
  1: "Necklaces",
  2: "Bracelets",
  3: "Earrings",
  4: "Rings",
  5: "T-shirt",
};
const materialMap = {
  1: "Gold",
  2: "Emerald",
  3: "Diamond",
};
const genderMap = {
  1: "Male",
  2: "Female",
  3: "Other",
};
const zodiacMap = {
  1: "Aries",
  2: "Taurus",
  3: "Gemini",
  4: "Cancer",
  5: "Leo",
  6: "Virgo",
  7: "Libra",
  8: "Scorpio",
  9: "Sagittarius",
  10: "Capricorn",
  11: "Aquarius",
  12: "Pisces",
};

const ProductTabs = ({ activeTab, setActiveTab, product }) => {
  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="infomation">
            <p>
              <span className="label">Material</span>{" "}
              <span className="content">
                {materialMap[product["material-id"]]}
              </span>
            </p>
            <p>
              <span className="label">Category</span>{" "}
              <span className="content">
                {categoryMap[product["category-id"]]}
              </span>
            </p>
            <p>
              <span className="label">Zodiac</span>{" "}
              <span className="content">{zodiacMap[product["zodiac-id"]]}</span>
            </p>
            <p>
              <span className="label">Gender</span>{" "}
              <span className="content">{genderMap[product["gender-id"]]}</span>
            </p>
          </div>
        );
      case "additional":
        return (
          <div className="description-product">
            <p>{product["description-product"]}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="product-tabs">
        <div
          className={`product-tab ${
            activeTab === "description" ? "active" : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          Information
        </div>
        <div
          className={`product-tab ${
            activeTab === "additional" ? "active" : ""
          }`}
          onClick={() => setActiveTab("additional")}
        >
          Product description
        </div>
      </div>
      <div className="product-tab-separator" />
      <div className="product-tab-content">{renderContent()}</div>
    </div>
  );
};

const DetailProduct = () => {
  const { fetchCartItemCount } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product || {});
  const [mainImageSrc, setMainImageSrc] = useState(
    product["image-urls"] ? product["image-urls"][0] : ""
  );
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  const [similarProducts, setSimilarProducts] = useState([]);

  // Lấy token từ localStorage
  const token = localStorage.getItem("token");

  // Hàm lấy thông tin sản phẩm từ API
  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(
        `https://zodiacjewerlyswd.azurewebsites.net/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.success && response.data.data) {
        setProduct(response.data.data);
        setMainImageSrc(response.data.data["image-urls"][0]);
      } else {
        console.error(
          "Invalid response format or missing data in API response"
        );
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Hàm lấy toàn bộ sản phẩm từ các trang
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `https://zodiacjewerlyswd.azurewebsites.net/api/products`
      );

      if (
        response.data &&
        response.data.success &&
        response.data.data &&
        Array.isArray(response.data.data["list-data"])
      ) {
        const totalPages = response.data.data["total-page"];
        const allProducts = [];

        // Lặp qua từng trang để lấy danh sách sản phẩm
        for (let page = 1; page <= totalPages; page++) {
          const pageResponse = await axios.get(
            `https://zodiacjewerlyswd.azurewebsites.net/api/products?page=${page}&pageSize=5`
          );

          if (
            pageResponse.data &&
            pageResponse.data.success &&
            Array.isArray(pageResponse.data.data["list-data"])
          ) {
            allProducts.push(...pageResponse.data.data["list-data"]);
          } else {
            console.error(`Failed to fetch products for page ${page}`);
          }
        }

        // Loại bỏ sản phẩm đang xem chi tiết
        const viewedProductId = parseInt(id);
        const filteredProducts = allProducts.filter(
          (p) => p.id !== viewedProductId
        );
        setSimilarProducts(filteredProducts);
      } else {
        console.error(
          "Invalid response format or missing data in API response"
        );
        setSimilarProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setSimilarProducts([]);
    }
  };

  useEffect(() => {
    fetchProduct(id);
    fetchAllProducts();
  }, [id]);

  const handleImageClick = (index) => {
    setMainImageSrc(product["image-urls"][index]);
  };

  const handleAddToCart = async () => {
    const hint = localStorage.getItem("hint");
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const productID = id;
    // const navigate = useNavigate();

    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!token) {
      enqueueSnackbar("Please login to add products to cart", {
        variant: "warning",
        preventDuplicate: true,
      });
      navigate("/login"); // Chuyển hướng đến trang đăng nhập
      return;
    }

    for (let i = 0; i < quantity; i++) {
      try {
        const response = await axios.post(
          `https://zodiacjewerlyswd.azurewebsites.net/api/orders/${hint}/${productID}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data && response.data.success) {
          fetchCartItemCount(); // Update cart count
          console.log(
            `Sản phẩm ${productID} đã được thêm vào giỏ hàng cho người dùng ${hint}`
          );
          enqueueSnackbar("The product has been added to cart", {
            variant: "success",
            preventDuplicate: true,
          });
        } else {
          console.error(
            "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng:",
            response.data
          );
          enqueueSnackbar("An error occurred", {
            variant: "error",
            preventDuplicate: true,
          });
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!", error);
        enqueueSnackbar("An error occurred", {
          variant: "error",
          preventDuplicate: true,
        });
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="product-detail-container">
        <div className="product-images">
          <div className="main-product-image">
            <img src={mainImageSrc} alt="Main product" />
          </div>
          <div className="product-image-thumbnails">
            {product["image-urls"]?.map((src, index) => (
              <ProductImage
                key={index}
                src={src}
                alt={`Thumbnail ${index}`}
                index={index}
                onClick={handleImageClick}
                isSelected={mainImageSrc === src}
              />
            ))}
          </div>
        </div>
        <div className="product-details">
          <h1 className="product-name">{product["name-product"]}</h1>

          <p className="product-price">
            <span className="currency">$</span>
            <span className="price">{formatPrice(product.price)}</span>
          </p>

          {product.quantity < 1 && (
            <span className="out-of-stock">OUT OF STOCK</span>
          )}

          <div className="quantity-and-cart">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                disabled={product.quantity === 0 || product.quantity < 0}
              >
                -
              </button>
              <div className="quantity-value">{quantity}</div>
              <button
                onClick={() =>
                  setQuantity(
                    quantity >= product.quantity
                      ? product.quantity
                      : quantity + 1
                  )
                }
                disabled={product.quantity === 0 || product.quantity < 0}
              >
                +
              </button>
            </div>

            <div className="current-quantity">
              ({product.quantity} products available){" "}
            </div>
          </div>

          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={product.quantity === 0 || product.quantity < 0}
          >
            <AddShoppingCartIcon /> ADD TO CART
          </button>

          {/* <button className="checkout-button" onClick={handleAddToCart}>
            PROCESS TO CHECKOUT
          </button> */}
          <ProductTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            product={product}
          />
        </div>
      </div>

      <div className="similar-products">
        <h2>Similar Products</h2>
        <div className="similar-products-list">
          {similarProducts.length > 0 ? (
            similarProducts.map((product) => (
              <SimilarProduct
                key={product.id}
                imageSrc={product["image-urls"][0]}
                name={product["name-product"]}
                price={product.price}
                product={product}
              />
            ))
          ) : (
            <p>No similar products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
