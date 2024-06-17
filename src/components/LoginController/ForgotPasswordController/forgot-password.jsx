import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const lastRequestTime = localStorage.getItem("lastRequestTime");
    if (lastRequestTime) {
      const elapsed = Math.floor(
        (Date.now() - parseInt(lastRequestTime, 10)) / 1000
      );
      if (elapsed < 30) {
        setCounter(30 - elapsed);
      }
    }

    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    if (!email) {
      enqueueSnackbar("Please enter your email address.", {
        anchorOrigin: { horizontal: "right", vertical: "top" },
        variant: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `https://zodiacjewerly.azurewebsites.net/api/authentication/forgot-password?email=${encodeURIComponent(
          email
        )}`
      );
      if (response.status === 200) {
        localStorage.setItem("email", email);
        localStorage.setItem("lastRequestTime", Date.now().toString());
        enqueueSnackbar("OTP has been sent to your email.", {
          anchorOrigin: { horizontal: "right", vertical: "top" },
          variant: "success",
        });
        setCounter(30); // Start the countdown
        navigate("/OTPVerificationPage");
      }
    } catch (error) {
      enqueueSnackbar(
        "Don't have any email in the data like that, please try again !!",
        {
          anchorOrigin: { horizontal: "right", vertical: "top" },
          variant: "warning",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="flex flex-col self-center px-5 mt-16 max-w-full w-[495px] max-md:mt-10">
        <div className="title-header flex-auto text-6xl leading-10 text-center">
          <span className="font-bold bg-gradient-custom-header-title bg-clip-text text-transparent">
            Z
          </span>
          <span className="bg-gradient-custom-header-title bg-clip-text text-transparent">
            odiacGems
          </span>
        </div>
        <div className="flex flex-col mt-8 max-md:max-w-full">
          <div className="flex flex-col max-md:max-w-full">
            <div className="justify-center text-3xl font-semibold tracking-tight leading-9 text-slate-900 max-md:max-w-full">
              Forgot your password?
            </div>
            <div className="mt-2 text-sm leading-5 text-slate-500 max-md:max-w-full">
              Enter your email address and we’ll send you a code to reset your
              password
            </div>
          </div>
          <div className="flex flex-col mt-5 max-md:max-w-full">
            <div className="flex flex-col max-md:max-w-full">
              <div className="flex flex-col whitespace-nowrap max-md:max-w-full">
                <div className="text-sm font-medium leading-5 text-slate-900 max-md:max-w-full">
                  Email
                </div>
                <div className="flex flex-col justify-center mt-1.5 text-base leading-6 text-slate-400 max-md:max-w-full">
                  <div className="flex flex-col justify-center max-md:max-w-full">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={handleEmailChange}
                      className="text-black justify-center items-start px-3 py-2 bg-white rounded-md border border-solid border-slate-300 max-md:pr-5 max-md:max-w-full"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleResetPassword}
                className="flex justify-center items-center px-4 py-2 mt-4 text-sm font-medium leading-6 text-white rounded-md bg-slate-900 max-md:px-5 max-md:max-w-full"
                disabled={counter > 0 || loading}
              >
                {counter > 0
                  ? `Can resend OTP in 00:${
                      counter < 10 ? `0${counter}` : counter
                    }`
                  : loading
                  ? "Sending..."
                  : "Reset password"}
              </button>
            </div>
            <Link
              to="/login"
              className="self-center mt-5 text-sm leading-5 underline text-slate-500"
            >
              Back to login page
            </Link>
          </div>
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a86a699345d885d7b39629c6d34c5f78b862847a62aed687bf45d66451bfd25?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
        className="mt-28 w-full aspect-[5] max-md:mt-10 max-md:max-w-full"
      />
    </div>
  );
}

export default ForgotPassword;
