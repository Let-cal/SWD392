import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
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
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || {});
  const [mainImageSrc, setMainImageSrc] = useState(product.imageURLs ? product.imageURLs[0] : '');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (!product.id) {
      axios.get(`http://api.yourapi.com/products/${id}`)
        .then(response => {
          setProduct(response.data);
          setMainImageSrc(response.data.imageURLs[0]);
        })
        .catch(error => {
          console.error("There was an error fetching the product data!", error);
        });
    }
  }, [id, product.id]);

  const handleImageClick = (index) => {
    setMainImageSrc(product.imageURLs[index]);
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
            {product.imageURLs?.map((src, index) => (
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
          <h1 className="product-name">{product.title}</h1>
          <StarRating />
          <p className="product-price">{product.price}</p>
          <button className="add-to-cart-button">Add to cart</button>
          <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
      <div className="similar-products">
        <h2>Similar Products</h2>
        <div className="similar-products-list">
          {similarProducts.map((product, index) => (
            <SimilarProduct
              key={index}
              imageSrc={product.imageSrc}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
