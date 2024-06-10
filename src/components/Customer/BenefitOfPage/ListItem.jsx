import PropTypes from "prop-types";
import { useMemo } from "react";

const ListItem = ({
  className = "",
  emptyBenefitMarkers,
  affordablePrices,
  propDisplay,
  propMinWidth,
  propMargin,
  content,
}) => {
  const emptyBenefitMarkersStyle = useMemo(() => {
    return {
      display: propDisplay,
      minWidth: propMinWidth,

      border: "1px solid #000", // Sử dụng Tailwind CSS class thay vì inline style
      // borderRadius: "100%", // Xóa dòng này và sử dụng class Tailwind CSS
    };
  }, [propDisplay, propMinWidth]);

  const affordablePricesStyle = useMemo(() => {
    return {
      margin: propMargin,
    };
  }, [propMargin]);

  return (
    <div
      className={`flex-1 flex flex-col items-start justify-start gap-[24px] min-w-[261px] max-w-full text-left text-base text-black font-text-small-link ${className}`}
    >
      <b
        className={`relative text-center w-[11%] hover:text-white hover:bg-black text-[38px] leading-[58px] font-bold lg:text-19xl lg:leading-[46px] sm:text-10xl sm:leading-[35px] rounded-full`} // Thêm class rounded-full ở đây
        style={emptyBenefitMarkersStyle}
      >
        {emptyBenefitMarkers}
      </b>
      <b
        className="self-stretch relative font-serif text-[35px] leading-[34px] font-bold sm:text-lgi sm:leading-[27px]"
        style={affordablePricesStyle}
      >
        {affordablePrices}
      </b>
      <div className="self-stretch relative leading-[150%]">{content}</div>
      <div className="flex flex-row items-center justify-center gap-[8px]"></div>
    </div>
  );
};

ListItem.propTypes = {
  className: PropTypes.string,
  emptyBenefitMarkers: PropTypes.string,
  affordablePrices: PropTypes.string,
  content: PropTypes.string.isRequired,

  /** Style props */
  propDisplay: PropTypes.any,
  propMinWidth: PropTypes.any,
  propMargin: PropTypes.any,
};

export default ListItem;
