import PropTypes from "prop-types";

const Card = ({ src }) => {
  return (
    <div className="CollectionCard">
      <img src={src} alt="" />
    </div>
  );
};

Card.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Card;
