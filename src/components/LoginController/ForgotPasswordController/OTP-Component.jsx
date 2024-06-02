import PropTypes from "prop-types";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import OTPInput from "./OTPInput";
import OTPResend from "./OTPResend";
const OTPComponent = ({ className = "" }) => {
  const onButtonClick = useCallback(() => {
    // Please sync "Change password page" to the project
  }, []);

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[16px] max-w-full text-left text-11xl text-slate-900 font-body-medium ${className}`}
    >
      <div className="flex flex-col items-start justify-start pt-0 px-0 pb-1 box-border gap-[8px] max-w-full">
        <h1 className="m-0 relative text-inherit tracking-[-0.01em] leading-[36px] font-semibold font-inherit mq450:text-lg mq450:leading-[22px] mq1050:text-5xl mq1050:leading-[29px]">
          Reset your password
        </h1>
        <div className="relative text-sm leading-[20px] text-slate-500">
          We just sent a 6 digit OTP. Enter that code here to proceed
        </div>
      </div>
      <OTPInput />

      <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-1 gap-[16px] text-lg text-forestgreen">
        <div className="self-stretch relative leading-[24px] font-medium">
          OTP sent successfully.
        </div>
        <button
          className="cursor-pointer [border:none] py-2 px-5 bg-slate-900 self-stretch rounded-md flex flex-row items-start justify-center hover:bg-darkslategray"
          onClick={onButtonClick}
        >
          <Link to="/Forgot-PasswordPage">
            <div className="relative text-sm leading-[24px] font-medium font-body-medium text-white text-left inline-block min-w-[87px]">
              Validate OTP
            </div>
          </Link>
        </button>
      </div>
      <OTPResend />
    </div>
  );
};

OTPComponent.propTypes = {
  className: PropTypes.string,
};

export default OTPComponent;
