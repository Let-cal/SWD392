import PropTypes from "prop-types";
import ImgComponents from "./ImgComponent";

const Content = ({ className = "" }) => {
  return (
    <div
      className={`w-[672px] flex flex-col items-start justify-start gap-[47.7px] max-w-full text-left text-base text-light-colors-black-light font-px-heading-5 mq750:gap-[24px] ${className}`}
    >
      <div className="self-stretch flex flex-col items-start justify-start gap-[44px] max-w-full text-14xl mq750:gap-[22px]">
        <div className="w-[659px] flex flex-col items-start justify-start gap-[24px] max-w-full">
          <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
            <a className="[text-decoration:none] text-5xl font-serif font-bold relative leading-[43px] text-[inherit] inline-block min-w-[97px] max-md:text-xl max-md:leading-[26px] max-lg:text-7xl max-lg:leading-[34px]">
              About
            </a>
          </div>
          <div className="self-stretch relative text-xl leading-[26px] text-center max-md:text-base max-md:leading-[21px]">
            Who we are and why we do what we do!
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border max-w-full text-base">
          <p className="m-0 flex-1 relative leading-[27px] inline-block max-w-full">{`Welcome to our e-commerce website, your ultimate destination for zodiac-themed jewelry, fashion accessories, and more. Our mission is to bring you a unique shopping experience tailored to your astrological sign, helping you find items that resonate with your personality and style.`}</p>
        </div>
        <ImgComponents title="Top trends" img01="/images/Img 02.png" />
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border max-w-full">
        <div className="flex-1 flex flex-col items-start justify-start gap-[16px] max-w-full">
          <p className="m-0 self-stretch relative leading-[27px]">{`Our product range includes a variety of items such as bracelets, rings, and clothing, all featuring zodiac patterns and designs. You can even enter your birthdate to discover your zodiac sign and receive personalized product recommendations. Whether you're shopping for yourself or looking for the perfect gift, we've got something for every zodiac sign.`}</p>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[15px] box-border max-w-full">
            <div className="flex-1 relative inline-block max-w-full">
              <p className="[margin-block-start:0] [margin-block-end:10px]">
                <span className="text-xs leading-[20px]">●</span>
                <span className="leading-[27px]">
                  {" "}
                  Products for one or multiple zodiac signs
                </span>
              </p>
              <p className="[margin-block-start:0] [margin-block-end:10px]">
                <span className="text-xs leading-[20px]">●</span>
                <span className="leading-[27px]">
                  {" "}
                  Gender-neutral options for everyone
                </span>
              </p>
              <p className="[margin-block-start:0] [margin-block-end:10px]">
                <span className="text-xs leading-[20px]">●</span>
                <span className="leading-[27px]">
                  {" "}
                  Create combo sets for couples with different zodiac signs
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ImgComponents title="Produced with care" img01="/images/Img 01.png" />
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border max-w-full">
        <p className="m-0 h-[106px] flex-1 relative leading-[27px] inline-block max-w-full">
          <span className="block">
            We also offer attractive pricing on combo sets, making them more
            affordable than buying individual items. Our platform supports
            seamless online payment integration for a smooth and secure shopping
            experience. Additionally, we have a mobile app to enhance your
            shopping experience on the go.
          </span>
        </p>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[20px] max-w-full text-14xl mq750:gap-[22px]">
        <div className="w-[659px] flex flex-col items-start justify-start gap-[24px] max-w-full">
          <h2 className="m-0 relative text-inherit leading-[35px] font-serif font-semibold  ">
            Our Team
          </h2>
        </div>
        <div className="self-stretch relative text-xl leading-[26px]  max-md:text-base max-md:leading-[21px]">
          Meet the people behind our brand.
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border max-w-full text-base">
          <p className="m-0 flex-1 relative leading-[27px] inline-block max-w-full">{`Our dedicated team is here to ensure you have the best shopping experience possible. From our web staff to our administrators, everyone is committed to bringing you high-quality, zodiac-themed products and exceptional customer service.`}</p>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[44px] max-w-full text-14xl mq750:gap-[22px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[20px] max-w-full text-14xl mq750:gap-[22px]">
          <div className="w-[659px] flex flex-col items-start justify-start gap-[24px] max-w-full">
            <h2 className="m-0 relative text-inherit leading-[35px] font-serif font-semibold  ">
              Customer Experience
            </h2>
          </div>
          <div className="self-stretch relative text-xl leading-[26px]  max-md:text-base max-md:leading-[21px]">
            What our customers are saying.
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border max-w-full text-base">
            <p className="m-0 flex-1 relative leading-[27px] inline-block max-w-full">{`Our dedicated team is here to ensure you have the best shopping experience possible. From our web staff to our administrators, everyone is committed to bringing you high-quality, zodiac-themed products and exceptional customer service.`}</p>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border max-w-full text-base">
          <p className="m-0 flex-1 relative leading-[27px] inline-block max-w-full">{`We value our customers' feedback and are proud to share their experiences with our products. Here are some testimonials from our satisfied customers:`}</p>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[16px] max-w-full">
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[15px] box-border max-w-full">
            <div className="flex-1 relative inline-block max-w-full">
              <p className="[margin-block-start:0] [margin-block-end:10px]">
                <span className="text-xs leading-[20px]">●</span>
                <span className="leading-[27px]">{` "I absolutely love the zodiac jewelry! It's stylish and perfectly matches my personality." - Jane D.`}</span>
              </p>
              <p className="[margin-block-start:0] [margin-block-end:10px]">
                <span className="text-xs leading-[20px]">●</span>
                <span className="leading-[27px]">{` "The personalized product recommendations were spot on. I found exactly what I was looking for." - Mark S.`}</span>
              </p>
              <p className="[margin-block-start:0] [margin-block-end:10px]">
                <span className="text-xs leading-[20px]">●</span>
                <span className="leading-[27px]">{` "Great customer service and fast delivery. Highly recommend!" - Lisa W.`}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Content.propTypes = {
  className: PropTypes.string,
};

export default Content;
