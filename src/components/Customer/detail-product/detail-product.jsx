import React, { useState } from 'react';
import './detail-product.css';
import Header from '../Header/header';

const ProductImage = ({ src, alt, index, onClick, isSelected }) => (
  <img className={`product-image ${isSelected ? 'selected' : ''}`} src={src} alt={alt} onClick={() => onClick(index)} />
);

const StarRating = () => (
  <div className="star-rating">
    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/78a1bdfe7c736d5b5e34757fba74aee36ffa0b45d7df7bc339b8273b235ca54b?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&" alt="Star rating" />
    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c4220fe4b80b6702c915be682a230c66b8e49261bae6492d0a148844d104f9e?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&" alt="Star rating" />
    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5f51e65cba39ea10e09d417dc0bf23b78e49612a72c5fdb873b81e0ad6eed1?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&" alt="Star rating" />
    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/854fe63c8b0569389d288604f1ec9c320dcb7a49be291e9f6cccba510c67e705?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&" alt="Star rating" />
    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/53bde7d8867c04547bf62773bf062b08d695744f26b0310f5b31bf0eb1df0ed8?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&" alt="Star rating" />
  </div>
);

const SimilarProduct = ({ imageSrc, name, price }) => (
  <div className="similar-product">
    <img className="similar-product-image" src={imageSrc} alt={name} />
    <div className="similar-product-name">{name}</div>
    <div className="similar-product-price">{price}</div>
  </div>
);

const similarProducts = [
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/fa2431b48e76b4c142211c9a59b19e862fc0c4693a408ef6ed68ccd5574bdb11?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&",
    name: "Ollie Earrings",
    price: "$ 30,00",
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/075e707772432c99a2362648c2aca63dcd733e927afe32e208e053441241455f?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&",
    name: "Hal Earrings",
    price: "$ 25,00",
  },
  {
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e42c3bcd612397ac9c671f9a98e7e35974e7c071483994cd7ee8ea4e70f24862?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&",
    name: "Kaede Hair Pin Set Of 3",
    price: "$ 30,00",
  },
];

const ProductTabs = ({ activeTab, setActiveTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            placerat, augue a volutpat hendrerit, sapien tortor faucibus
            augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu
            facilisis consequat sed eu felis. Nunc sed porta augue. Morbi
            porta tempor odio, in molestie diam bibendum sed.
          </div>
        );
      case 'additional':
        return (
          <div>
            Additional information content goes here. You can provide detailed
            information about the product specifications, materials, etc.
          </div>
        );
      case 'reviews':
        return <div>There are no reviews yet. Be the first to review this product!</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="product-tabs">
        <div
          className={`product-tab ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </div>
        <div
          className={`product-tab ${activeTab === 'additional' ? 'active' : ''}`}
          onClick={() => setActiveTab('additional')}
        >
          Additional information
        </div>
        <div
          className={`product-tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews(0)
        </div>
      </div>
      <div className="product-tab-separator" />
      <div className="product-tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

const DetailProduct = () => {
  const [mainImageSrc, setMainImageSrc] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLq2KfR8nMZK4pEAqKASaJchrvzrrkOxsqbmzKVn_M5pCn4LzZKz77-pr4scQo_IqSm2g&usqp=CAU");
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const handleThumbnailClick = (index) => {
    setSelectedThumbnail(index);
    // Đồng thời cập nhật ảnh chính khi click vào thumbnail
    switch (index) {
      case 0:
        setMainImageSrc("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLq2KfR8nMZK4pEAqKASaJchrvzrrkOxsqbmzKVn_M5pCn4LzZKz77-pr4scQo_IqSm2g&usqp=CAU");
        break;
      case 1:
        setMainImageSrc("https://www.tierra.vn/files/800x/platinum-2-LM6YuE2MVW.jpg");
        break;
      case 2:
        setMainImageSrc("https://www.tierra.vn/files/300x/a1-204--bmXEbxmAkv.jpg");
        break;
      case 3:
        setMainImageSrc("https://bizweb.dktcdn.net/thumb/grande/100/067/696/files/cach-chon-nhan-cuoi-theo-cung-hoang-dao.jpg?v=1513435964158");
        break;
      default:
        setMainImageSrc("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLq2KfR8nMZK4pEAqKASaJchrvzrrkOxsqbmzKVn_M5pCn4LzZKz77-pr4scQo_IqSm2g&usqp=CAU");
        break;
    }
  };

  return (
    <>
    <Header />
    <div className="container">

      <div className="header-separator" />

      <main className="main-content">
        <div className="separator" />
        <div className="product-details">
          <div className="product-gallery">
            <ProductImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLq2KfR8nMZK4pEAqKASaJchrvzrrkOxsqbmzKVn_M5pCn4LzZKz77-pr4scQo_IqSm2g&usqp=CAU"
              alt="Product thumbnail"
              index={0}
              onClick={handleThumbnailClick}
              isSelected={selectedThumbnail === 0}
            />
            <ProductImage
              src="https://www.tierra.vn/files/800x/platinum-2-LM6YuE2MVW.jpg"
              alt="Product thumbnail"
              index={1}
              onClick={handleThumbnailClick}
              isSelected={selectedThumbnail === 1}
            />
            <ProductImage
              src="https://www.tierra.vn/files/300x/a1-204--bmXEbxmAkv.jpg"
              alt="Product thumbnail"
              index={2}
              onClick={handleThumbnailClick}
              isSelected={selectedThumbnail === 2}
            />
            <ProductImage
              src="https://bizweb.dktcdn.net/thumb/grande/100/067/696/files/cach-chon-nhan-cuoi-theo-cung-hoang-dao.jpg?v=1513435964158"
              alt="Product thumbnail"
              index={3}
              onClick={handleThumbnailClick}
              isSelected={selectedThumbnail === 3}
            />
          </div>
          <img
            src={mainImageSrc}
            className="product-main-image"
            alt="Product main"
          />
          <div className="product-info">
            <h1 className="product-title">Lira Earrings</h1>
            <div className="product-price">$ 20,00</div>
            <div className="product-rating">
              <StarRating />
              <div className="review-count">1 customer review</div>
            </div>
            <p className="product-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aliquam placerat, augue a volutpat hendrerit, sapien tortor
              faucibus augue, a maximus elit ex vitae libero. Sed quis
              mauris eget arcu facilisis consequat sed eu felis.{" "}
            </p>
            <div className="product-actions">
              <div className="quantity-selector">
                <div className="quantity-btn">-</div>
                <div className="quantity-value">1</div>
                <div className="quantity-btn">+</div>
              </div>
              <button className="add-to-cart-btn">ADD TO CART</button>
            </div>
            {/* <div className="social-sharing">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/15ad4e69036431255242c52703d569d3f6e2fdbe33d2af17b1009f9000ef8ae2?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&"
                className="social-icon"
                alt="Social sharing icon"
              />
              <div className="social-separator" />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac4af405e4a2074b313180508cb8f5896a0b0bcc85262d84aefc3897397a5425?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&"
                className="social-icon"
                alt="Social sharing icon"
              />
            </div> */}
            <div className="product-meta">
              <div className="product-meta-label">Material:</div>
              <div className="product-meta-value">Gold</div>
            </div>
            <div className="product-meta">
              <div className="product-meta-label">Categories:</div>
              <div className="product-meta-value">Ring</div>
            </div>
          </div>
        </div>

        <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <h2 className="similar-products-title">Other Items</h2>
        <div className="similar-products">
          {similarProducts.map((product) => (
            <SimilarProduct key={product.name} {...product} />
          ))}
        </div>
        <div className="separator" />
        <form className="newsletter-form">
          <label htmlFor="newsletter-input" className="visually-hidden">
            Give an email, get the newsletter.
          </label>
          <input
            type="email"
            id="newsletter-input"
            className="newsletter-input"
            placeholder="Give an email, get the newsletter."
            aria-label="Give an email, get the newsletter."
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4a81552353ddc6cf542340113428cce528e4e8dbfd18c5b359edfe4bba9e08f?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&"
            className="newsletter-icon"
            alt="Newsletter icon"
          />
        </form>
        <footer className="footer">
          <div className="footer-links">
            <div className="footer-link">CONTACT</div>
            <div className="footer-link">TERMS OF SERVICES</div>
            <div className="footer-link">SHIPPING AND RETURNS</div>
          </div>
          <div className="footer-separator" />
          <div className="footer-bottom">
            <div className="footer-text">
              <span>© 2021 Shelly. </span>Terms of use{" "}
              <span>and</span> privacy policy.
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/af02bd9a2ee1530da7c8449ac2778fe498b1beba541832fdb1cd40c233aa31b2?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&"
              className="footer-cards"
              alt="Accepted payment methods"
            />
          </div>
        </footer>
      </main>
    </div>
    </>
  );
};

export default DetailProduct;
