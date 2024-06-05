import PropTypes from "prop-types";
import ListItem from "./ListItem";

const ReasonChoose = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch bg-white overflow-hidden flex flex-row items-start justify-center py-28  box-border gap-[80px] max-w-full text-left text-29xl text-black font-text-small-link md:gap-[40px] md:box-border mq1125:pt-[73px] mq1125:pb-[73px] mq1125:box-border sm:gap-[20px] sm:pt-[47px] sm:pb-[47px] sm:box-border lg:flex-wrap max-sm:hidden ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[24px] min-w-[247px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-col items-start justify-start gap-[24px] lg:self-stretch lg:w-auto">
            <h1 className="m-0 text-[38px] self-stretch relative text-inherit leading-[58px] font-bold font-inherit md:text-19xl md:leading-[46px] sm:text-10xl sm:leading-[35px]">
              Why Choose Us
            </h1>
            <div className="self-stretch relative text-md leading-[150%]">
              Welcome to our furniture store, where we believe that a
              well-furnished home is a happy home. We offer a wide selection of
              high-quality furniture for every room in your home, from cozy
              sofas and elegant dining sets to stylish office desks and
              comfortable beds.
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start pt-4 px-0 pb-0">
          <button className="cursor-pointer py-2.5 px-[23px] bg-black rounded-8xs flex flex-row items-center justify-center whitespace-nowrap border-[1px] border-solid border-black hover:bg-darkslategray-100 hover:box-border hover:border-[1px] hover:border-solid hover:border-darkslategray-100">
            <div className="relative text-base leading-[150%] font-text-small-link text-white text-left inline-block min-w-[73px]">
              Shop Now
            </div>
          </button>
        </div>
      </div>
      <div className="w-[852px] flex flex-col items-start justify-start gap-[64px] min-w-[852px] max-w-full text-base mq1125:gap-[32px] mq1125:min-w-full sm:gap-[16px] lg:flex-1">
        <div className="self-stretch flex flex-row items-start justify-start gap-[48px] max-w-full md:flex-wrap sm:gap-[24px]">
          <ListItem
            emptyBenefitMarkers="1"
            affordablePrices="Affordable Prices"
          />
          <ListItem
            emptyBenefitMarkers="2"
            affordablePrices="Free Shipping"
            propDisplay="inline-block"
            propMinWidth="28px"
            propMargin="unset"
          />
        </div>
        <div className="self-stretch flex flex-row items-start justify-start gap-[48px] max-w-full md:flex-wrap sm:gap-[24px]">
          <ListItem
            emptyBenefitMarkers="3"
            affordablePrices="Best Quality"
            propDisplay="inline-block"
            propMinWidth="28px"
            propMargin="unset"
          />
          <ListItem
            emptyBenefitMarkers="4"
            affordablePrices="Money Back Guaranty"
            propDisplay="inline-block"
            propMinWidth="28px"
            propMargin="0"
          />
        </div>
      </div>
    </section>
  );
};

ReasonChoose.propTypes = {
  className: PropTypes.string,
};
export default ReasonChoose;
