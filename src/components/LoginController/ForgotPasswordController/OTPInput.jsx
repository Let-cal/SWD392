import { useRef, useState } from "react";

const OTPInput = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

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
            onFocus={(e) => e.target.select()}
            ref={(el) => (inputs.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
};

export default OTPInput;
