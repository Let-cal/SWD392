import PropTypes from "prop-types";
import ListItem from "./ListItem";

const ReasonChoose = ({ className = "", scrollToTrustedCompanies }) => {
  return (
    <section
      className={`self-stretch bg-white overflow-hidden flex flex-row items-start justify-center box-border gap-[80px] max-w-full text-left text-29xl text-black font-text-small-link md:gap-[40px] md:box-border  mq1125:box-border sm:gap-[20px]  sm:box-border lg:flex-wrap max-sm:hidden ${className}`}
    >
      <div className="h-[560px] p-5 bg-[#fff7f7] rounded-lg flex-1 flex flex-col items-start justify-start gap-[24px] bg-[url('/images/zodiacImagePage.png')] bg-cover bg-no-repeat bg-[top] min-w-[247px] max-w-full transform transition-transform duration-300 hover:scale-105 ">
        <div className="self-stretch flex flex-col items-start justify-start">
          <div className="self-stretch flex flex-col items-start justify-start gap-[24px] lg:self-stretch lg:w-auto ">
            <h1 className="m-0 font-serif text-[35px] self-stretch relative text-inherit leading-[58px] font-bold font-inherit md:text-19xl md:leading-[46px] sm:text-10xl sm:leading-[35px]">
              Why Choose Us
            </h1>
            <div className="self-stretch relative text-md leading-[150%]">
              Step into our celestial jewelry boutique, where every piece tells
              a story woven with the stars. Embrace the magic of the zodiac as
              you browse through our curated collection of handcrafted
              treasures, each design infused with the essence of its
              corresponding constellation. From delicate necklaces to bold
              statement rings, our jewelry celebrates the individuality and
              spirit of every zodiac sign, ensuring that you will find the
              perfect adornment to reflect your cosmic destiny.
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start pt-4 px-0 pb-0">
          <button
            className="cursor-pointer py-2.5 hover:opacity-85 px-[23px] bg-black rounded-8xs flex flex-row items-center justify-center whitespace-nowrap border-[1px] border-solid border-black hover:bg-darkslategray-100 hover:box-border hover:border-[1px] hover:border-solid hover:border-darkslategray-100"
            onClick={scrollToTrustedCompanies}
          >
            <div className="relative  text-base leading-[150%] font-text-small-link text-white text-left inline-block min-w-[73px]">
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
            content="Gemini-themed necklace with intricate design, perfect for those born under the Gemini sign. This stunning necklace features a delicate twin motif symbolizing the dual nature of Gemini."
          />
          <ListItem
            emptyBenefitMarkers="2"
            affordablePrices="Free Shipping"
            propDisplay="inline-block"
            propMinWidth="28px"
            propMargin="unset"
            content="A stunning Leo-inspired bracelet crafted with attention to detail and shipped free of charge. The bold design of this bracelet reflects the confidence and charisma of the Leo sign. "
          />
        </div>
        <div className="self-stretch flex flex-row items-start justify-start gap-[48px] max-w-full md:flex-wrap sm:gap-[24px]">
          <ListItem
            emptyBenefitMarkers="3"
            affordablePrices="Best Quality"
            propDisplay="inline-block"
            propMinWidth="28px"
            propMargin="unset"
            content="Virgo-themed ring made from the finest materials, ensuring the best quality for the discerning Virgo. Precision-crafted with meticulous attention to detail, this ring embodies the perfectionism and practicality of the Virgo sign."
          />
          <ListItem
            emptyBenefitMarkers="4"
            affordablePrices="Money Back Guaranty"
            propDisplay="inline-block"
            propMinWidth="28px"
            propMargin="0"
            content="Aquarius-inspired earrings backed by our money-back guarantee, promising satisfaction for all Aquarians. These unique earrings capture the innovative and eccentric spirit of Aquarius, making them the perfect accessory for those who march to the beat of their own drum. "
          />
        </div>
      </div>
    </section>
  );
};

ReasonChoose.propTypes = {
  className: PropTypes.string,
  scrollToTrustedCompanies: PropTypes.func.isRequired,
};

export default ReasonChoose;
