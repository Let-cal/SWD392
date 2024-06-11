import PropTypes from "prop-types";

const InfoZodiac = ({ id, nameZodiac, desZodiac, Action }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200 hover:bg-gray-100 transition duration-300">
      <div className="w-1/4 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {id}
      </div>
      <div className="w-1/4 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {nameZodiac}
      </div>
      <div className="w-1/4 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {desZodiac}
      </div>
      <div className="w-1/4 px-4 text-center text-xs uppercase text-gray-500 font-medium">
        {Action}
      </div>
    </div>
  );
};

InfoZodiac.propTypes = {
  id: PropTypes.number.isRequired,
  nameZodiac: PropTypes.string.isRequired,
  desZodiac: PropTypes.string.isRequired,
  Action: PropTypes.node,
};

export default InfoZodiac;
