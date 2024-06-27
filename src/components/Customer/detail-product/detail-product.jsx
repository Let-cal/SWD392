import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
ProductImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
const SimilarProduct = ({ imageSrc, name, price, product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/DetailProduct/${product.id}`, { state: { product } });
  };

  return (
    <div className="similar-product" onClick={handleClick}>
      <img className="similar-product-image" src={imageSrc} alt={name} />
      <div className="similar-product-name">{name}</div>
      <div className="similar-product-price">
        <span className="price">{price}</span>
        <span className="currency">đ</span>
      </div>
    </div>
  );
};
SimilarProduct.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  product: PropTypes.object.isRequired,
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

// eslint-disable-next-line react/prop-types
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
ProductTabs.propTypes = {
  activeTab: PropTypes.oneOf(["description", "additional"]).isRequired,
  setActiveTab: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};
const DetailProduct = () => {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(location.state?.product || {});
  const [mainImageSrc, setMainImageSrc] = useState(
    product["image-urls"] ? product["image-urls"][0] : ""
  );
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  const fetchProduct = async (productId) => {
    try {
      const response = await axios.get(
        `https://zodiacjewerlyswd.azurewebsites.net/api/products/${productId}`
      );
      if (response.data && response.data.success && response.data.data) {
        const productData = response.data.data;
        setProduct(productData);
        setMainImageSrc(productData["image-urls"][0]);
      } else {
        console.error(
          "Dữ liệu sản phẩm không hợp lệ hoặc thiếu các thuộc tính cần thiết:",
          response.data
        );
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu sản phẩm!", error);
    }
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  useEffect(() => {
    axios
      .get("https://zodiacjewerlyswd.azurewebsites.net/api/products")
      .then((response) => {
        console.log("API Response:", response.data);
        if (
          response.data &&
          response.data.success &&
          Array.isArray(response.data.data)
        ) {
          setSimilarProducts(response.data.data);
        } else {
          setSimilarProducts([]);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the similar products data!",
          error
        );
        setSimilarProducts([]);
      });
  }, []);

  const handleImageClick = (index) => {
    setMainImageSrc(product["image-urls"][index]);
  };

  const handleAddToCart = () => {
    console.log(`Số lượng: ${quantity}`);
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
            <span className="price">{product.price}</span>
            <span className="currency">đ</span>
          </p>

          <div className="quantity-and-cart">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <div className="quantity-value">{quantity}</div>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            <AddShoppingCartIcon /> ADD TO CART
          </button>

          <button className="checkout-button" onClick={handleAddToCart}>
            PROCESS TO CHECKOUT
          </button>
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
            similarProducts
              .filter((similarProduct) => similarProduct.id !== product.id)
              .map((product) => (
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
DetailProduct.propTypes = {
  product: PropTypes.shape({
    "material-id": PropTypes.number,
    "category-id": PropTypes.number,
    "zodiac-id": PropTypes.number,
    "gender-id": PropTypes.number,
    "image-urls": PropTypes.arrayOf(PropTypes.string),
    "name-product": PropTypes.string,
    price: PropTypes.number,
    "description-product": PropTypes.string,
  }),
};
export default DetailProduct;
