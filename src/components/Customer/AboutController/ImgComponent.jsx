import PropTypes from "prop-types";

const ImgComponents = ({ className = "", title, img01 }) => {
  return (
    <div
      className={`self-stretch h-[358px] flex flex-row items-start justify-start py-0 pr-0 pl-0.5 box-border max-w-full text-left text-7xl text-light-colors-black-light font-px-heading-5 ${className}`}
    >
      <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[23px] max-w-full">
        <h2 className="m-0 relative text-inherit leading-[35px] font-normal font-inherit mq450:text-2xl mq450:leading-[28px]">
          {title}
        </h2>
        <img
          className="self-stretch flex-1 relative rounded-lg max-w-full overflow-hidden max-h-full object-cover"
          loading="lazy"
          alt=""
          src={img01}
        />
      </div>
    </div>
  );
};

ImgComponents.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  img01: PropTypes.string,
};

export default ImgComponents;
