import { defineElement } from "@lordicon/element";
import lottie from "lottie-web";
import PropTypes from "prop-types";
import { useMemo } from "react";
defineElement(lottie.loadAnimation);
const Product = ({
  className = "",
  ProductName,
  NumOfProducts,
  propWidth,
  propFlex,
  propMinWidth,
  propWidth1,
  propFontSize,
}) => {
  const ProductStyle = useMemo(() => {
    return {
      width: propWidth,
      flex: propFlex,
      minWidth: propMinWidth,
    };
  }, [propWidth, propFlex, propMinWidth]);

  const NumOfProductsStyle = useMemo(() => {
    return {
      width: propWidth1,
      fontSize: propFontSize,
    };
  }, [propWidth1, propFontSize]);

  return (
    <div
      className={`w-[312px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-background box-border overflow-hidden shrink-0 flex flex-col items-start justify-center py-[18px] pr-3 pl-[18px] text-left text-base text-black font-body-medium border-[1px] border-solid border-lightgray ${className}`}
      style={ProductStyle}
    >
      <div className="self-stretch flex flex-row items-center justify-between gap-[0]">
        <div className="w-[200px] relative inline-block shrink-0">
          {ProductName}
        </div>
        <lord-icon
          src="https://cdn.lordicon.com/mqdkoaef.json"
          trigger="loop"
          delay="2000"
          style={{ width: "15%", height: "46px" }}
        ></lord-icon>
      </div>
      <div className="w-[155px] flex flex-col items-start justify-between py-[9.5px] px-0 box-border min-h-[51px] text-7xl text-darkslategray font-montserrat">
        <div
          className=" gap-4 relative font-semibold mq450:text-2xl flex items-center justify-between"
          style={NumOfProductsStyle}
        >
          {NumOfProducts}
          <lord-icon
            src="https://cdn.lordicon.com/qhkvfxpn.json"
            trigger="loop"
            delay="2000"
            style={{ width: "30%", height: "46px" }}
          ></lord-icon>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  className: PropTypes.string,
  ProductName: PropTypes.string,
  NumOfProducts: PropTypes.string,

  /** Style props */
  propWidth: PropTypes.any,
  propFlex: PropTypes.any,
  propMinWidth: PropTypes.any,
  propWidth1: PropTypes.any,
  propFontSize: PropTypes.any,
};

export default Product;
