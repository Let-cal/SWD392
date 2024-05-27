import PropTypes from "prop-types";

const ProfileMain = ({ className = "" }) => {
  return (
    <header
      className={`w-[1248px] flex flex-col items-start justify-start gap-[17px] max-w-full text-left text-16xl text-light-colors-accent-light font-allerta-stencil ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-between pt-0.5 px-0 pb-0 box-border max-w-full gap-[20px]">
        <a className="[text-decoration:none] w-[158px] relative leading-[40.5px] inline-block shrink-0 whitespace-nowrap text-[inherit]">
          <span>S</span>
          <span className="text-light-colors-black-light">HOPPE</span>
        </a>
        <div className="w-[504px] flex flex-col items-start justify-start pt-1.5 px-0 pb-0 box-border max-w-full text-base text-light-colors-black-light font-px-heading-5">
          <div className="self-stretch flex flex-row items-end justify-start gap-[48px] mq750:gap-[24px]">
            <div className="flex-1 flex flex-row items-start justify-between gap-[20px] mq750:hidden">
              <div className="flex flex-col items-start justify-start py-0 pr-4 pl-0">
                <a className="[text-decoration:none] relative leading-[27px] text-[inherit] inline-block min-w-[38px]">
                  Shop
                </a>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-4 pl-0">
                <a className="[text-decoration:none] relative leading-[27px] text-[inherit] inline-block min-w-[32px]">
                  Blog
                </a>
              </div>
              <a className="[text-decoration:none] relative leading-[27px] text-[inherit] inline-block min-w-[72px] whitespace-nowrap">
                Our Story
              </a>
              <div className="h-[21px] flex flex-col items-start justify-start pt-1 px-0 pb-0 box-border">
                <div className="w-px h-[18px] relative box-border border-r-[1px] border-solid border-light-colors-dark-gray-light" />
              </div>
            </div>
            <div className="w-[138px] flex flex-col items-start justify-end pt-0 px-0 pb-0.5 box-border">
              <div className="self-stretch flex flex-row items-start justify-between gap-[20px]">
                <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
                  <img
                    className="w-[19px] h-[19px] relative"
                    loading="lazy"
                    alt=""
                    src="/icon-color.svg"
                  />
                </div>
                <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
                  <img
                    className="w-[21px] h-[21px] relative overflow-hidden shrink-0"
                    loading="lazy"
                    alt=""
                    src="/shoppingcart-1.svg"
                  />
                </div>
                <img
                  className="h-5 w-5 relative"
                  loading="lazy"
                  alt=""
                  src="/icon-color-1.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-light-colors-gray-light" />
    </header>
  );
};

ProfileMain.propTypes = {
  className: PropTypes.string,
};

export default ProfileMain;
