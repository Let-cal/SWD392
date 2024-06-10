import axios from "axios";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput from "./OTPInput";
import OTPResend from "./OTPResend";

const OTPComponent = ({ className = "" }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleChange = (newOtp) => {
    setOtp(newOtp);
  };

  const onButtonClick = async () => {
    const email = localStorage.getItem("email");
    const codeOTP = otp.join(""); // Combine the OTP digits into a single string

    console.log("OTP entered:", codeOTP);
    console.log("Email from localStorage:", email);

    if (!email) {
      enqueueSnackbar("Email not found in local storage, please try again!", {
        anchorOrigin: { horizontal: "right", vertical: "top" },
        variant: "warning",
      });
      return;
    }

    if (codeOTP.length !== 6) {
      enqueueSnackbar("Please enter a 6 digit OTP!", {
        anchorOrigin: { horizontal: "right", vertical: "top" },
        variant: "warning",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://zodiacjewerly.azurewebsites.net/api/authentication/email-otp-pass",
        {
          email,
          "code-otp": codeOTP,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Handle successful OTP verification
        enqueueSnackbar("OTP Verified Successfully", {
          anchorOrigin: { horizontal: "right", vertical: "top" },
          variant: "success",
        });

        navigate("/ChangePasswordPage");
      } else {
        // Handle unsuccessful OTP verification
        enqueueSnackbar("OTP Verification Failed", {
          anchorOrigin: { horizontal: "right", vertical: "top" },
          variant: "error",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.title || "Error verifying OTP, please try again!";
      enqueueSnackbar(errorMessage, {
        anchorOrigin: { horizontal: "right", vertical: "top" },
        variant: "error",
      });
      console.error(
        "Error verifying OTP:",
        error.response ? error.response.data : error
      );
    }
  };

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
      <OTPInput otp={otp} setOtp={handleChange} />

      <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-1 gap-[16px] text-lg text-forestgreen">
        <div className="self-stretch relative leading-[24px] font-medium">
          OTP sent successfully.
        </div>
        <button
          className="cursor-pointer [border:none] py-2 px-5 bg-slate-900 self-stretch rounded-md flex flex-row items-start justify-center hover:bg-darkslategray"
          onClick={onButtonClick}
        >
          <div className="relative text-sm leading-[24px] font-medium font-body-medium text-white text-left inline-block min-w-[87px]">
            Validate OTP
          </div>
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
