import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import PropTypes from "prop-types";
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

const TrustedCompanies = ({ selectedZodiacId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [zodiac, setZodiac] = useState("");

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeMaterial = (event) => {
    setMaterial(event.target.value);
  };

  const handleChangeZodiac = (event) => {
    const value = event.target.value;
    setSelectedZodiacId(value === "" ? null : value);
  };

  const [cardsData, setCardsData] = useState([]);
  const [zodiacDetail, setZodiacDetail] = useState(null);

  useEffect(() => {
    axios.get('https://zodiacjewerly.azurewebsites.net/api/products')
      .then(response => {
        console.log('API response:', response.data);

        const apiData = response.data.data;
        const categoryMap = {
          1: 'Necklaces',
          2: 'Bracelets',
          3: 'Earrings',
          4: 'Rings',
          5: 'T-shirt',
        };
        const materialMap = {
          1: 'Gold',
          2: 'Emerald',
          3: 'Diamond',
        };
        const genderMap = {
          1: 'Male',
          2: 'Female',
          3: 'Other',
        };
        const zodiacMap = {
          1: 'Aries',
          2: 'Taurus',
          3: 'Gemini',
          4: 'Cancer',
          5: 'Leo',
          6: 'Virgo',
          7: 'Libra',
          8: 'Scorpio',
          9: 'Sagittarius',
          10: 'Capricorn',
          11: 'Aquarius',
          12: 'Pisces',
        };

        let filteredData = apiData;

        if (selectedZodiacId) {
          filteredData = apiData.filter(product => product["zodiac-id"] === selectedZodiacId);
        }

        if (category) {
          filteredData = filteredData.filter(product => product["category-id"] === parseInt(category));
        }

        if (material) {
          filteredData = filteredData.filter(product => product["material-id"] === parseInt(material));
        }

        if (zodiac) {
          filteredData = filteredData.filter(product => product["zodiac-id"] === parseInt(zodiac));
        }

        const formattedData = filteredData.map(product => ({
          image: product["image-urls"] && product["image-urls"][0] ? product["image-urls"][0] : 'default-image-url',
          alt: product["name-product"],
          title: product["name-product"],
          price: product.price,
          product,
          tags: [
            { name: categoryMap[product["category-id"]], color: '#ff5733', className: 'tag-category' },
            { name: materialMap[product["material-id"]], color: '#33ff57', className: 'tag-material' },
            { name: genderMap[product["gender-id"]], color: '#3357ff', className: 'tag-gender' },
            { name: zodiacMap[product["zodiac-id"]], color: '#ff33a8', className: 'tag-zodiac' },
          ]
        }));

        setCardsData(formattedData);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [selectedZodiacId, category, material, zodiac]);

  useEffect(() => {
    if (selectedZodiacId) {
      axios.get(`https://zodiacjewerly.azurewebsites.net/api/zodiacs/${selectedZodiacId}`)
        .then(response => {
          console.log('Zodiac detail:', response.data);
          setZodiacDetail(response.data);
        })
        .catch(error => {
          console.error('Error fetching zodiac detail:', error);
        });
    }
  }, [selectedZodiacId]);

  return (
    <section>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <h2>
        <span className="flex justify-between items-end font-serif">
          Leading Companies
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
                      onChange={handleChangeCategory}
                      label="Category"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>Necklaces</MenuItem>
                      <MenuItem value={2}>Bracelets</MenuItem>
                      <MenuItem value={3}>Earrings</MenuItem>
                      <MenuItem value={4}>Rings</MenuItem>
                      <MenuItem value={5}>T-shirt</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Material
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={material}
                      onChange={handleChangeMaterial}
                      label="Material"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>Gold</MenuItem>
                      <MenuItem value={2}>Emerald</MenuItem>
                      <MenuItem value={3}>Diamond</MenuItem>
                    </Select>
                  </FormControl>
                  {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Zodiac
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={zodiac}
                      onChange={handleChangeZodiac}
                      label="Zodiac"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>Aries</MenuItem>
                      <MenuItem value={2}>Taurus</MenuItem>
                      <MenuItem value={3}>Gemini</MenuItem>
                      <MenuItem value={4}>Cancer</MenuItem>
                      <MenuItem value={5}>Leo</MenuItem>
                      <MenuItem value={6}>Virgo</MenuItem>
                      <MenuItem value={7}>Libra</MenuItem>
                      <MenuItem value={8}>Scorpio</MenuItem>
                      <MenuItem value={9}>Sagittarius</MenuItem>
                      <MenuItem value={10}>Capricorn</MenuItem>
                      <MenuItem value={11}>Aquarius</MenuItem>
                      <MenuItem value={12}>Pisces</MenuItem>
                    </Select>
                  </FormControl> */}
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
        {cardsData.length > 0 ? (
          cardsData.map((card, index) => (
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

      {zodiacDetail && (
        <div>
          <h2 className="font-serif md:text-2xl">{zodiacDetail["name-zodiac"]}</h2>
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
