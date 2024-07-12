import { defineElement } from "@lordicon/element";
import lottie from "lottie-web";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";

defineElement(lottie.loadAnimation);

const StatisticsCard = ({
  className = "",
  title,
  fetchData,
  propWidth,
  propFlex,
  propMinWidth,
  propWidth1,
  propFontSize,
  iconSrc1,
  iconSrc2,
  iconSize = "46px",
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [fetchData]);

  const cardStyle = useMemo(
    () => ({
      width: propWidth,
      flex: propFlex,
      minWidth: propMinWidth,
    }),
    [propWidth, propFlex, propMinWidth]
  );

  const textStyle = useMemo(
    () => ({
      width: propWidth1,
      fontSize: propFontSize,
    }),
    [propWidth1, propFontSize]
  );

  return (
    <div
      className={`w-[312px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.1)] rounded-xl bg-background box-border overflow-hidden shrink-0 flex flex-col items-start justify-center py-[18px] pr-3 pl-[18px] text-left text-base text-black font-body-medium border-[1px] border-solid border-lightgray ${className}`}
      style={cardStyle}
    >
      <div className="self-stretch flex flex-row items-center justify-between gap-[0]">
        <div className="w-[200px] relative inline-block shrink-0">{title}</div>

        <lord-icon
          src={iconSrc1}
          trigger="loop"
          delay="2000"
          style={{ width: "15%", height: iconSize }}
        ></lord-icon>
      </div>
      <div className="w-[155px] flex flex-col items-start justify-between py-[9.5px] px-0 box-border min-h-[51px] text-7xl text-darkslategray font-montserrat">
        <div
          className="gap-4 relative font-semibold mq450:text-2xl flex items-center justify-between"
          style={textStyle}
        >
          {data !== null ? data : "Loading..."}
          <lord-icon
            src={iconSrc2}
            trigger="loop"
            delay="2000"
            style={{ width: "30%", height: iconSize }}
          ></lord-icon>
        </div>
      </div>
    </div>
  );
};

StatisticsCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  propWidth: PropTypes.any,
  propFlex: PropTypes.any,
  propMinWidth: PropTypes.any,
  propWidth1: PropTypes.any,
  propFontSize: PropTypes.any,
  iconSrc1: PropTypes.string.isRequired,
  iconSrc2: PropTypes.string.isRequired,
  iconSize: PropTypes.string,
};

export default StatisticsCard;
