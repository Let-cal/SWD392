import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OTPResend = () => {
  const [counter, setCounter] = useState(30);
  const [showLink, setShowLink] = useState(false);
  const [email, setEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const history = useNavigate();

  useEffect(() => {
    // Retrieve the email from local storage
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);

    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    if (counter === 0) {
      setShowLink(true);
    }

    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      history.push("/login");
      return (event.returnValue = "");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [history]);

  const resendOTP = async () => {
    if (!email) {
      enqueueSnackbar("Failed to resend OTP", {
        anchorOrigin: { horizontal: "right", vertical: "top" },
        variant: "warning",
      });
      return;
    }
    try {
      const response = await axios.post(
        `https://zodiacjewerly.azurewebsites.net/api/authentication/email-pass?email=${encodeURIComponent(
          email
        )}`
      );
      if (response.status === 200) {
        enqueueSnackbar("OTP has been sent to your email.", {
          anchorOrigin: { horizontal: "right", vertical: "top" },
          variant: "success",
        });
        setCounter(30); // Reset the counter after resending OTP
        setShowLink(false); // Hide the link until the timer resets
      }
    } catch (error) {
      enqueueSnackbar("Failed to send OTP. Please try again.", {
        anchorOrigin: { horizontal: "right", vertical: "top" },
        variant: "error",
      });
    }
  };

  return (
    <div className="relative text-sm leading-[20px] text-slate-500 whitespace-nowrap">
      {showLink ? (
        <button onClick={resendOTP} className="text-blue-500 hover:underline">
          Didn’t get OTP? - Click here to regenerate OTP
        </button>
      ) : (
        <>
          Didn’t get OTP? - regenerate OTP in 00:
          {counter < 10 ? `0${counter}` : counter}
        </>
      )}
    </div>
  );
};

export default OTPResend;
