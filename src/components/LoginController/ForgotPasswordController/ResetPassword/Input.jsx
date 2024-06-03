import PropTypes from "prop-types";
import { useMemo } from "react";

const Input = ({
  className = "",
  email,
  emailPlaceholder,
  propMinWidth,
  propWidth,
}) => {
  const emailStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const email1Style = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[6px] max-w-full text-left text-sm text-slate-900 font-body-medium ${className}`}
    >
      <div
        className="relative leading-[20px] font-medium inline-block min-w-[100px]"
        style={emailStyle}
      >
        {email}
      </div>
      <div className="self-stretch flex flex-row items-start justify-start gap-[8px] max-w-full text-light-colors-white-light">
        <div className="flex-1 flex flex-col items-start justify-start max-w-full">
          <div className="self-stretch rounded-md bg-light-colors-white-light flex flex-row items-center justify-start py-1.5 px-3 border-[1px] border-solid border-lightgray">
            <input
              className="w-[113px] [border:none] [outline:none] font-body-medium text-base bg-[transparent] h-6 relative leading-[24px] text-left inline-block p-0"
              placeholder={emailPlaceholder}
              type="text"
              style={email1Style}
            />
          </div>
        </div>
        <div className="rounded-md bg-slate-900 hidden flex-row items-center justify-center py-2 px-4">
          <div className="relative leading-[24px] font-medium">Subscribe</div>
        </div>
      </div>
      <div className="w-[164px] relative leading-[20px] text-slate-500 hidden">
        Enter your email address
      </div>
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
  emailPlaceholder: PropTypes.string,

  /** Style props */
  propMinWidth: PropTypes.any,
  propWidth: PropTypes.any,
};

export default Input;
