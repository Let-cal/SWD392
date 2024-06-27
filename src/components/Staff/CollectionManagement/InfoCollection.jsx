// InforCollection.jsx
import PropTypes from "prop-types";

const InforCollection = ({
  CollectionNumber,
  Name,
  Status,
  date_open,
  date_close,
  image,
  Action,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "green";
      case "Unavailable":
        return "red";
      default:
        return "gray";
    }
  };
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200 hover:bg-gray-100 transition duration-300">
      <div className="w-1/5 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {CollectionNumber}
      </div>
      <div className="w-1/5 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {Name}
      </div>
      <div
        className="w-1/5 px-4 text-center font-bold text-xs uppercase text-gray-500 "
        style={{ color: getStatusColor(Status) }}
      >
        {Status}
      </div>
      <div className="w-1/5 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {date_open}
      </div>
      <div className="w-1/5 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {date_close}
      </div>
      <div className="w-1/5 px-4 text-center text-xs uppercase text-gray-500 font-medium flex items-center justify-center">
        {image}
      </div>
      <div className="w-1/5 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {Action}
      </div>
    </div>
  );
};

InforCollection.propTypes = {
  CollectionNumber: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  Status: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired,
  date_close: PropTypes.string.isRequired,
  date_open: PropTypes.string.isRequired,
  Action: PropTypes.node.isRequired,
};

export default InforCollection;
