import { Pagination } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Card from "./CardItems"; // Import the Card component
import FilterComponent from "./FilterComponent"; // Import the FilterComponent

const TrustedCompanies = ({ selectedZodiacId }) => {
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [gender, setGender] = useState("");
  const [cardsData, setCardsData] = useState([]);
  const [zodiacDetail, setZodiacDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeMaterial = (event) => {
    setMaterial(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleDeleteFilter = (filterType) => {
    if (filterType === "category") setCategory("");
    if (filterType === "material") setMaterial("");
    if (filterType === "gender") setGender("");
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

  useEffect(() => {
    setIsLoading(true); // Set loading to true
    axios
      .get("https://zodiacjewerlyswd.azurewebsites.net/api/products")
      .then((response) => {
        const apiData = response.data.data;

        let filteredData = apiData;

        if (selectedZodiacId) {
          filteredData = apiData.filter(
            (product) => product["zodiac-id"] === selectedZodiacId
          );
        }

        if (category) {
          filteredData = filteredData.filter(
            (product) => product["category-id"] === parseInt(category)
          );
        }

        if (material) {
          filteredData = filteredData.filter(
            (product) => product["material-id"] === parseInt(material)
          );
        }

        if (gender) {
          filteredData = filteredData.filter(
            (product) => product["gender-id"] === parseInt(gender)
          );
        }

        const formattedData = filteredData.map((product) => ({
          image:
            product["image-urls"] && product["image-urls"][0]
              ? product["image-urls"][0]
              : "default-image-url",
          alt: product["name-product"],
          title: product["name-product"],
          price: product.price,
          product,
          tags: [
            {
              name: categoryMap[product["category-id"]],
              color: "#ff5733",
              className: "tag-category",
            },
            {
              name: materialMap[product["material-id"]],
              color: "#33ff57",
              className: "tag-material",
            },
            {
              name: genderMap[product["gender-id"]],
              color: "#3357ff",
              className: "tag-gender",
            },
            {
              name: zodiacMap[product["zodiac-id"]],
              color: "#ff33a8",
              className: "tag-zodiac",
            },
          ],
        }));

        setCardsData(formattedData);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setIsLoading(false); // Set loading to false on error
      });
  }, [selectedZodiacId, category, material, gender]);

  useEffect(() => {
    if (selectedZodiacId) {
      setIsLoading(true); // Set loading to true
      axios
        .get(
          `https://zodiacjewerly.azurewebsites.net/api/zodiacs/${selectedZodiacId}`
        )
        .then((response) => {
          setZodiacDetail(response.data);
          setIsLoading(false); // Set loading to false after data is fetched
        })
        .catch((error) => {
          console.error("Error fetching zodiac detail:", error);
          setIsLoading(false); // Set loading to false on error
        });
    }
  }, [selectedZodiacId]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const itemsPerPage = 16;
  const pageCount = Math.ceil(cardsData.length / itemsPerPage);
  const displayedCards = cardsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className={isLoading ? "cursor-wait" : ""}>
      <h2>
        <span className="flex justify-between items-end font-serif">
          Leading Companies
          <FilterComponent
            category={category}
            material={material}
            gender={gender}
            handleChangeCategory={handleChangeCategory}
            handleChangeMaterial={handleChangeMaterial}
            handleChangeGender={handleChangeGender}
            handleDeleteFilter={handleDeleteFilter}
            categoryMap={categoryMap}
            materialMap={materialMap}
            genderMap={genderMap}
            zodiacMap={zodiacMap}
          />
        </span>
        <div className="shrink-0 mt-2.5 h-px bg-black border border-black border-solid font-serif"></div>
        <span className="font-serif">have trusted us</span>
      </h2>

      <div className="container-product-card">
        {isLoading ? (
          <p>Loading...</p>
        ) : displayedCards.length > 0 ? (
          displayedCards.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              alt={card.alt}
              title={card.title}
              price={card.price}
              tags={card.tags}
              product={card.product}
            />
          ))
        ) : (
          <p>There is no corresponding product.</p>
        )}
      </div>
      <div className="flex justify-center">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#b2b251",
              color: "#fff",
            },
          }}
        />
      </div>

      {zodiacDetail && (
        <div>
          <h2 className="font-serif md:text-2xl">
            {zodiacDetail["name-zodiac"]}
          </h2>
          <p>{zodiacDetail["des-zodiac"]}</p>
        </div>
      )}
    </section>
  );
};

TrustedCompanies.propTypes = {
  selectedZodiacId: PropTypes.number,
};

export default TrustedCompanies;
