import PropTypes from "prop-types";

const InforOrder = ({
  OrderNumber,
  UserID,
  Date,
  Status,
  TotalPrice,
  Action,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Pending":
        return "orange";
      case "Shipped":
        return "blue";
      case "Cancelled":
        return "red";
      default:
        return "gray";
    }
  };
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200 hover:bg-gray-100 transition duration-300">
      <div className="w-1/5 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {OrderNumber}
      </div>
      <div className="w-1/5 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {UserID}
      </div>
      <div className="w-1/5 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {Date}
      </div>
      <div
        className="w-1/5 px-4 text-center font-bold text-xs uppercase text-gray-500 "
        style={{ color: getStatusColor(Status) }}
      >
        {Status}
      </div>
      <div className="w-1/5 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {TotalPrice}
      </div>
      <div className="w-1/5 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {Action}
      </div>
    </div>
  );
};

InforOrder.propTypes = {
  OrderNumber: PropTypes.string.isRequired,
  UserID: PropTypes.string.isRequired,
  Date: PropTypes.string.isRequired,
  Status: PropTypes.string.isRequired,
  TotalPrice: PropTypes.string.isRequired,
  Action: PropTypes.node.isRequired,
};

export default InforOrder;
