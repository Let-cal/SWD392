import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./zodiac.css";
import TrustedCompanies from '../customer-productCard/productCard';

function ZodiacSignCard({ name, imageSrc, isSelected, onClick }) {
  const [isClicked, setIsClicked] = useState(isSelected);

  useEffect(() => {
    setIsClicked(isSelected);
  }, [isSelected]);

  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className={`button-zodiac flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-md ${isClicked ? 'clicked' : ''}`}
      onClick={handleClick}
    >
      <img
        src={imageSrc}
        alt={`${name} zodiac sign symbol`}
        className="w-20 h-[50px] mb-4"
      />
      <div className="text text-x0.8 font-semibold">{name}</div>
      <span className="star"></span>
    </button>
  );
}

ZodiacSignCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

function ZodiacSignList({ selectedZodiacId, onZodiacClick }) {
  const zodiacSigns = [
    { name: "Aries", imageSrc: "public/images/Icon/Icon-1.svg", id: 1 },
    { name: "Taurus", imageSrc: "public/images/Icon/Icon-2.svg", id: 2 },
    { name: "Gemini", imageSrc: "public/images/Icon/Icon-3.svg", id: 3 },
    { name: "Cancer", imageSrc: "public/images/Icon/Icon-4.svg", id: 4 },
    { name: "Leo", imageSrc: "public/images/Icon/Icon-5.svg", id: 5 },
    { name: "Virgo", imageSrc: "public/images/Icon/Icon-6.svg", id: 6 },
    { name: "Libra", imageSrc: "public/images/Icon/Icon-7.svg", id: 7 },
    { name: "Scorpio", imageSrc: "public/images/Icon/Icon-8.svg", id: 8 },
    { name: "Sagittarius", imageSrc: "public/images/Icon/Icon-9.svg", id: 9 },
    { name: "Capricorn", imageSrc: "public/images/Icon/Icon-10.svg", id: 10 },
    { name: "Aquarius", imageSrc: "public/images/Icon/Icon-11.svg", id: 11 },
    { name: "Pisces", imageSrc: "public/images/Icon/Icon-12.svg", id: 12 },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12">
      {zodiacSigns.map((sign) => (
        <ZodiacSignCard
          key={sign.id}
          name={sign.name}
          imageSrc={sign.imageSrc}
          isSelected={selectedZodiacId === sign.id}
          onClick={() => onZodiacClick(sign.id)}
        />
      ))}
    </div>
  );
}

ZodiacSignList.propTypes = {
  selectedZodiacId: PropTypes.number,
  onZodiacClick: PropTypes.func.isRequired,
};

export default function App() {
  const [selectedZodiacId, setSelectedZodiacId] = useState(null);
  const [zodiacDetail, setZodiacDetail] = useState(null);
  const [products, setProducts] = useState([]);

  const handleZodiacClick = async (zodiacId) => {
    const newSelectedZodiacId = selectedZodiacId === zodiacId ? null : zodiacId;
    setSelectedZodiacId(newSelectedZodiacId);

    if (newSelectedZodiacId !== null) {
      console.log(`Selected Zodiac ID: ${newSelectedZodiacId}`);

      // Fetch zodiac details
      try {
        const response = await fetch(`https://zodiacjewerly.azurewebsites.net/api/zodiacs/${newSelectedZodiacId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setZodiacDetail(data);
      } catch (error) {
        console.error("Error fetching zodiac details:", error);
      }

      // Fetch products for the selected zodiac sign
      try {
        const response = await fetch(`https://zodiacjewerly.azurewebsites.net/api/products?zodiacId=${newSelectedZodiacId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setZodiacDetail(null); // Reset the zodiac detail when no zodiac is selected
      setProducts([]); // Reset the products list when no zodiac is selected
    }
  };

  return (
    <div className="container mx-auto px-0 py-8">
      <h1 className="font-serif md:text-4xl">Zodiac Signs</h1>
      <div className="shrink-0 mb-8 h-px bg-black border border-black border-solid"></div>
      <ZodiacSignList selectedZodiacId={selectedZodiacId} onZodiacClick={handleZodiacClick} />
      {zodiacDetail && (
        <div>
          <h2 className="font-serif md:text-2xl">{zodiacDetail["name-zodiac"]}</h2>
          <p>{zodiacDetail["des-zodiac"]}</p>
        </div>
      )}
      <TrustedCompanies selectedZodiacId={selectedZodiacId} products={products} />
    </div>
  );
}
