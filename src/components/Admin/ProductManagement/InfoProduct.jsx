import PropTypes from "prop-types";

const InforProduct = ({
  ProductNumber,
  nameProduct,
  Price,
  Category,
  materialId,
  Gender,
  Zodiac,
  Action,
}) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200 hover:bg-gray-100 transition duration-300">
      <div className="w-1/12 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {ProductNumber}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {nameProduct}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {Price}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {Category}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {materialId}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {Gender}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {Zodiac}
      </div>
      <div className="w-1/5 px-4 text-left text-xs uppercase text-gray-500 font-medium">
        {Action}
      </div>
    </div>
  );
};

InforProduct.propTypes = {
  ProductNumber: PropTypes.number.isRequired,
  nameProduct: PropTypes.string.isRequired,
  Price: PropTypes.string.isRequired,
  Category: PropTypes.string.isRequired,
  materialId: PropTypes.string.isRequired,
  Gender: PropTypes.string.isRequired,
  Zodiac: PropTypes.string.isRequired,
  Action: PropTypes.node.isRequired,
};

export default InforProduct;
