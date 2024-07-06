import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import "./Collection.css"; // Import CSS file specific to Collection component

function Collection() {
  const [collections, setCollections] = useState([]);
  const [token, setToken] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [selectedCollectionProducts, setSelectedCollectionProducts] = useState([]);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      setToken(userToken);
    }
  }, []);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('https://zodiacjewerlyswd.azurewebsites.net/api/collections?page=1&pageSize=8&sort=id', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.success) {
          setCollections(response.data.data.data);
        } else {
          console.error('Error fetching collections:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    if (token) {
      fetchCollections();
    }
  }, [token]);

  useEffect(() => {
    if (location.state && location.state.selectedCollectionId) {
      handleCollectionClick(location.state.selectedCollectionId);
    }
  }, [location.state, token]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeMaterial = (event) => {
    setMaterial(event.target.value);
  };

  const handleCollectionClick = async (collectionId) => {
    try {
      const response = await axios.get(`https://zodiacjewerlyswd.azurewebsites.net/api/collections/${collectionId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setSelectedCollectionId(collectionId);
        setSelectedCollectionProducts(response.data.data.products);
      } else {
        console.error('Error fetching collection products:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching collection products:', error);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/DetailProduct/${product.id}`, { state: { product } });
  };

  return (
    <div className="collection-container">
      <div className="collection-grid">
        {collections.map(collection => (
          <div
            key={collection.id}
            className={`collection-item ${selectedCollectionId === collection.id ? 'selected' : ''}`}
            onClick={() => handleCollectionClick(collection.id)}
          >
            <img src={collection['image-collection']} alt={collection['name-collection']} />
            <div className="collection-details">
              <h2>{collection['name-collection']}</h2>
              <p><strong>Open:</strong> {collection['date-open']}</p>
              <p><strong>Close:</strong> {collection['date-close']}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>
        <span className="flex justify-between items-end font-serif">
          Dealing Collections
          <div>
            <Button
              id="basic-button"
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
                </div>
              </Box>
            </Menu>
          </div>
        </span>
        <div className="shrink-0 mt-2.5 h-px bg-black border border-black border-solid font-serif"></div>
      </h2>

      {selectedCollectionId && (
        <div className="collection-selected-products">
          {selectedCollectionProducts.map(product => (
            <div
              key={product.id}
              className="collection-product-item"
              onClick={() => handleProductClick(product)}
            >
              <img src={product['image-urls'][0]['image-url']} alt={product['name-product']} />
              <div className="product-details">
                <h4>{product['name-product']}</h4>
                <p>
                  {product['price']}
                  <span>đ</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Collection;
