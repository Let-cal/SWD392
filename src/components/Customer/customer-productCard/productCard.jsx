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
import { useState } from "react";
import "./productCard.css";
const Card = ({ image, alt, title, description, tags }) => {
  return (
    <div className="card">
      <div className="card-inner" style={{ "--clr": "#fff" }}>
        <div className="box">
          <div className="imgBox">
            <img src={image} alt={alt} />
          </div>
          <div className="icon">
            <a href="#" className="iconBox">
              <span className="material-symbols-outlined">arrow_outward</span>
            </a>
          </div>
        </div>
      </div>
      <div className="content">
        <h3>{title}</h3>
        <p>{description}</p>
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
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.object),
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

  const cardsData = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/aae30422978342647c8d0d9193c8a66845f2bb0ae55e2f8c4877d6f67f292156?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Trust & Co.",
      title: "trust & co.",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d4d0e0c41c27a8ba8bf6d968218df6cc3aed36f2b2acc3b20439a7031c87c463?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Tonic",
      title: "tonic",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d4d0e0c41c27a8ba8bf6d968218df6cc3aed36f2b2acc3b20439a7031c87c463?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Shower Gel",
      title: "shower gel",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a9e977caf29eb1b2eec1c3fae1d3171f992fe449c6cf1451fc6304cc7ed72cd8?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Shower Gel",
      title: "shower gel",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/85b98ed4e25a833586bc54c1d5c6457cfd243aeb3bf5249ca27fbce37631719b?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Shower Gel",
      title: "shower gel",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/aae30422978342647c8d0d9193c8a66845f2bb0ae55e2f8c4877d6f67f292156?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Shower Gel",
      title: "shower gel",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/aae30422978342647c8d0d9193c8a66845f2bb0ae55e2f8c4877d6f67f292156?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Shower Gel",
      title: "shower gel",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/aae30422978342647c8d0d9193c8a66845f2bb0ae55e2f8c4877d6f67f292156?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Shower Gel",
      title: "shower gel",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
  ];

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
            description={card.description}
            tags={card.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default TrustedCompanies;
