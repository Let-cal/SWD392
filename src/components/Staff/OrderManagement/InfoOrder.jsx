import PropTypes from "prop-types";

const InforOrder = ({ OrderNumber, Date, Status, TotalPrice, Action }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200 hover:bg-gray-100 transition duration-300">
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {OrderNumber}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {Date}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {Status}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {TotalPrice}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {Action}
      </div>
    </div>
  );
};

InforOrder.propTypes = {
  OrderNumber: PropTypes.string,
  Date: PropTypes.string,
  Status: PropTypes.string,
  TotalPrice: PropTypes.string,
  Action: PropTypes.node,
};

export default InforOrder;
