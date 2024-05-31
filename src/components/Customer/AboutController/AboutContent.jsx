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
            <a className="[text-decoration:none] relative leading-[43px] font-medium text-[inherit] inline-block min-w-[97px] mq450:text-xl mq450:leading-[26px] mq1050:text-7xl mq1050:leading-[34px]">
              About
            </a>
          </div>
          <div className="self-stretch relative text-xl leading-[26px] text-center mq450:text-base mq450:leading-[21px]">
            Who we are and why we do what we do!
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border max-w-full text-base">
          <p className="m-0 flex-1 relative leading-[27px] inline-block max-w-full">{`Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin ante a, gravida arcu. Nam fringilla molestie velit, eget pellentesque risus scelerisque a. Nam ac urna maximus, tempor magna et, placerat urna. Curabitur eu magna enim. Proin placerat tortor lacus, ac sodales lectus placerat quis. `}</p>
        </div>
        <ImgComponents title="Top trends" img01="/img-01@2x.png" />
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border max-w-full">
        <div className="flex-1 flex flex-col items-start justify-start gap-[16px] max-w-full">
          <p className="m-0 self-stretch relative leading-[27px]">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. `}</p>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[15px] box-border max-w-full">
            <div className="flex-1 relative inline-block max-w-full">
              <p className="[margin-block-start:0] [margin-block-end:10px]">
                <span className="text-xs leading-[20px]">●</span>
                <span className="leading-[27px]">
                  {" "}
                  consectetur adipiscing elit. Aliquam placerat
                </span>
              </p>
              <p className="[margin-block-start:0] [margin-block-end:10px]">
                <span className="text-xs leading-[20px]">●</span>
                <span className="leading-[27px]">{` Lorem ipsum dolor sit amet consectetur `}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ImgComponents title="Produced with care" img01="/img-02@2x.png" />
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border max-w-full">
        <p className="m-0 h-[106px] flex-1 relative leading-[27px] inline-block max-w-full">
          <span className="block">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            placerat, augue a volutpat hendrerit, sapien tortor faucibus augue,
            a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
            consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor
            odio, in molestie diam bibendu.
          </span>
        </p>
      </div>
    </div>
  );
};

Content.propTypes = {
  className: PropTypes.string,
};

export default Content;
