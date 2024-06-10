import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
const OTPInput = ({ otp, setOtp }) => {
  const inputs = useRef([]);
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to the next input field if the current one is filled
    if (element.nextSibling && element.value) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      let newOtp = [...otp];
      // Clear the current field
      newOtp[index] = "";
      setOtp(newOtp);

      // Move to the previous input field if current is empty
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handlePaste = async (e, index) => {
    e.preventDefault(); // Prevent the default paste behavior
    try {
      const pastedData = await navigator.clipboard.readText(); // Read the clipboard content
      if (pastedData.length !== 6) {
        enqueueSnackbar("Please paste a valid 6 digit OTP!", {
          anchorOrigin: { horizontal: "right", vertical: "top" },
          variant: "warning",
        });
        return;
      }
      let newOtp = [...otp];
      // Automatically distribute the pasted characters across all input fields
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      // Focus on the first input field to allow manual typing after paste
      inputs.current[0].focus();
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  useEffect(() => {
    // Focus on the first input field when the component mounts
    inputs.current[0]?.focus();
  }, []);

  return (
    <div className="self-stretch flex flex-row items-center justify-start py-0 px-[77px] box-border max-w-full mq750:pl-[38px] mq750:pr-[38px] mq750:box-border">
      <div className="flex-1 flex flex-row justify-center items-center gap-[20px] max-w-full mq750:flex-wrap">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="h-[60px] w-10 text-center relative rounded-lg bg-light-colors-white-light box-border border-[1px] border-solid border-lightgray hover:bg-gray-200"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)} // Add this line
            onFocus={(e) => e.target.select()}
            ref={(el) => (inputs.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
};

OTPInput.propTypes = {
  otp: PropTypes.arrayOf(PropTypes.string).isRequired,
  setOtp: PropTypes.func.isRequired,
};

export default OTPInput;
