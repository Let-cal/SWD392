import PropTypes from "prop-types";

const ProfileContent = ({ className = "" }) => {
  return (
    <section
      className={`w-[1251px] flex flex-row items-start justify-start pt-0 pb-[116px] pr-0 pl-[3px] box-border max-w-full text-left text-xl text-light-colors-dark-gray-light font-px-heading-5 mq450:pb-[75px] mq450:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[27px] max-w-full">
        <div className="self-stretch h-9 flex flex-row flex-wrap items-end justify-start relative gap-[10px_80px] max-w-full mq750:h-auto mq750:min-h-[36]">
          <div className="w-[655px] !m-[0] absolute top-[0px] left-[0px] flex flex-row items-start justify-between py-0 px-5 box-border gap-[20px] max-w-full mq750:flex-wrap">
            <div className="relative leading-[26px] inline-block min-w-[64px] mq450:text-base mq450:leading-[21px]">
              Orders
            </div>
            <div className="relative leading-[26px] inline-block min-w-[99px] mq450:text-base mq450:leading-[21px]">
              Addresses
            </div>
            <div className="relative leading-[26px] mq450:text-base mq450:leading-[21px]">
              Account details
            </div>
            <a className="[text-decoration:none] relative leading-[26px] text-[inherit] inline-block min-w-[65px] mq450:text-base mq450:leading-[21px]">
              Logout
            </a>
          </div>
          <img
            className="h-0 w-[1248px] absolute !m-[0] top-[36px] left-[0px]"
            loading="lazy"
            alt=""
            src="/slider.svg"
          />
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[16px] max-w-full text-base">
          <div className="w-[1128px] flex flex-row items-start justify-between gap-[20px] max-w-full text-light-colors-black-light mq450:flex-wrap">
            <div className="relative leading-[27px] inline-block min-w-[120px]">
              ORDER NUMBER
            </div>
            <div className="relative leading-[27px] inline-block min-w-[38px]">
              DATE
            </div>
            <div className="relative leading-[27px] inline-block min-w-[55px]">
              STATUS
            </div>
            <div className="relative leading-[27px] inline-block min-w-[48px]">
              TOTAL
            </div>
            <div className="relative leading-[27px] inline-block min-w-[67px]">
              ACTIONS
            </div>
          </div>
          <div className="self-stretch h-2 flex flex-row items-start justify-start pt-0 px-0 pb-[7px] box-border max-w-full">
            <div className="self-stretch flex-1 relative box-border max-w-full border-t-[1px] border-solid border-light-colors-black-light" />
          </div>
          <div className="w-[1149px] flex flex-row items-start justify-between pt-0 px-0 pb-2 box-border gap-[20px] max-w-full mq1050:flex-wrap">
            <div className="w-[195px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <div className="relative leading-[27px] inline-block min-w-[128px]">
                7643980998990
              </div>
            </div>
            <div className="relative leading-[27px] inline-block min-w-[113px]">
              October 8,2021
            </div>
            <div className="w-[130px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <div className="relative leading-[27px] inline-block min-w-[70px]">
                Delivered
              </div>
            </div>
            <div className="w-[123px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <div className="relative leading-[27px] inline-block min-w-[40px] whitespace-nowrap">
                $ 105
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0 text-light-colors-accent-light">
              <b className="relative font-bold inline-block min-w-[88px]">
                View Order
              </b>
            </div>
          </div>
          <div className="self-stretch h-2 flex flex-row items-start justify-start pt-0 px-0 pb-[7px] box-border max-w-full">
            <div className="self-stretch flex-1 relative box-border max-w-full border-t-[1px] border-solid border-light-colors-gray-light" />
          </div>
          <div className="w-[1149px] flex flex-row items-start justify-between pt-0 px-0 pb-2 box-border gap-[20px] max-w-full mq1050:flex-wrap">
            <div className="w-[195px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <div className="relative leading-[27px] inline-block min-w-[120px]">
                943980998990
              </div>
            </div>
            <div className="relative leading-[27px] inline-block min-w-[113px]">
              October 8,2021
            </div>
            <div className="w-[130px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <div className="relative leading-[27px] inline-block min-w-[81px]">
                Processing
              </div>
            </div>
            <div className="w-[123px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <div className="relative leading-[27px] inline-block min-w-[41px] whitespace-nowrap">
                $ 100
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0 text-light-colors-accent-light">
              <b className="relative font-bold inline-block min-w-[88px]">
                View Order
              </b>
            </div>
          </div>
          <div className="self-stretch h-2 flex flex-row items-start justify-start pt-0 px-0 pb-[7px] box-border max-w-full">
            <div className="self-stretch flex-1 relative box-border max-w-full border-t-[1px] border-solid border-light-colors-gray-light" />
          </div>
          <div className="w-[1149px] flex flex-row items-start justify-between gap-[20px] max-w-full mq1050:flex-wrap">
            <div className="w-[201px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <div className="relative leading-[27px] inline-block min-w-[119px]">
                879980998990
              </div>
            </div>
            <div className="relative leading-[27px] inline-block min-w-[119px]">
              October 8,2020
            </div>
            <div className="w-[136px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <div className="relative leading-[27px] inline-block min-w-[70px]">
                Delivered
              </div>
            </div>
            <div className="w-[129px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border">
              <div className="relative leading-[27px] inline-block min-w-[34px] whitespace-nowrap">
                $ 65
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0 text-light-colors-accent-light">
              <b className="relative font-bold inline-block min-w-[88px]">
                View Order
              </b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ProfileContent.propTypes = {
  className: PropTypes.string,
};

export default ProfileContent;
