import CallMadeIcon from "@mui/icons-material/CallMade";
import PropTypes from "prop-types";
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
              <CallMadeIcon
                sx={{
                  color: "white",
                }}
              />
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

export default Card;
