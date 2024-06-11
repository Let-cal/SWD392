import TuneIcon from "@mui/icons-material/Tune";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./productCard.css";

const Card = ({ image, alt, title, price, tags, product }) => {
  const navigate = useNavigate();

  const handleDetailClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/DetailProduct/${product.id}`, { state: { product } });
  };

  return (
    <div className="card">
      <div className="card-inner" style={{ "--clr": "#fff" }}>
        <div className="box">
          <div className="imgBox">
            <img src={image} alt={alt} />
          </div>

          <div className="icon">
            <button className="iconBox" onClick={handleDetailClick}>
              <span className="material-symbols-outlined">arrow_outward</span>
            </button>
          </div>
        </div>
      </div>
      <div className="content">
        <h3>{title}</h3>
        <p>
          <span className="price">{price}</span>
          <span className="currency">đ</span>
        </p>
        <ul>
          {tags.map((tag, index) => (
            <li
              key={index}
              style={{ "--clr-tag": tag.color }}
              className={tag.className}
            >
              {tag.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.object),
  product: PropTypes.object.isRequired,
};

const TrustedCompanies = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    setMaterial(event.target.value);
  };
  const [Material, setMaterial] = useState("");
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    axios
      .get("https://zodiacjewerly.azurewebsites.net/api/products/all-products")
      .then((response) => {
        console.log("API response:", response.data); // Kiểm tra phản hồi từ API

        const apiData = response.data.data;
        const categoryMap = {
          1: "Necklaces",
          2: "Bracelets",
          3: "Earrings",
          4: "Rings",
          5: "T-shirt",
        };
        const materialMap = {
          1: "Gold",
          2: "Emeral",
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
          8: "Scropio",
          9: "Sagittarius",
          10: "Capricorn",
          11: "Aquarius",
          12: "Pisces",
        };

        const formattedData = apiData.map((product) => ({
          image:
            product["image-urls"] && product["image-urls"][0]
              ? product["image-urls"][0]
              : "default-image-url",
          alt: product["name-product"],
          title: product["name-product"],
          price: product.price,
          product, // pass the whole product object
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
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <section>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <h2>
        <span className="flex justify-between items-end font-serif">
          leading companies
          <div>
            <Button
              id="basic-button"
              className=""
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
              }}
            >
              <TuneIcon />
              FILTER
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Box sx={{ flexGrow: 1, maxWidth: 752, paddingX: 2.5 }}>
                <div className="flex flex-col">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={category}
                      onChange={handleChange}
                      label="Age"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ring</MenuItem>
                      <MenuItem value={20}>Bracelet</MenuItem>
                      <MenuItem value={30}>Necklace</MenuItem>
                      <MenuItem value={40}>Earrings</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Material
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={Material}
                      onChange={handleChange}
                      label="Age"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Gold</MenuItem>
                      <MenuItem value={20}>Silver</MenuItem>
                      <MenuItem value={30}>Platinum</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <button
                  className="coolBeans w-full h-10 flex items-center justify-center"
                  onClick={handleClose}
                >
                  <span className="uppercase font-serif">FILTER</span>
                </button>
              </Box>
            </Menu>
          </div>
        </span>
        <div className="shrink-0 mt-2.5 h-px bg-black border border-black border-solid font-serif"></div>
        <span className="font-serif">have trusted us</span>
      </h2>

      <div className="container-product-card">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            alt={card.alt}
            title={card.title}
            price={card.price}
            tags={card.tags}
            product={card.product} // pass the product object
          />
        ))}
      </div>
    </section>
  );
};

export default TrustedCompanies;
