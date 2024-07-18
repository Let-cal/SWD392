import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./InputForm";
const RegisterPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const lengthValid = password.length >= 6 && password.length <= 15;
    return hasUpperCase && hasSpecialChar && lengthValid;
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\d+$/.test(phoneNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate each field
    let newErrors = { ...errors };
    switch (name) {
      case "email":
        newErrors.email = validateEmail(value) ? "" : "Invalid email format";
        break;
      case "password":
        newErrors.password = validatePassword(value)
          ? ""
          : "Password must contain at least one uppercase letter, one special character, and be between 6 to 15 characters long";
        break;
      case "confirmPassword":
        newErrors.confirmPassword =
          value === formData.password ? "" : "Passwords do not match";
        break;
      case "phoneNumber":
        newErrors.phoneNumber = validatePhoneNumber(value)
          ? ""
          : "Phone number must contain only digits";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  useEffect(() => {
    const isValid =
      Object.values(errors).every((error) => error === "") &&
      Object.values(formData).every((value) => value !== "");
    setIsFormValid(isValid);
  }, [errors, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      enqueueSnackbar("Please correct all errors before submitting", {
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
        preventDuplicate: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://zodiacjewerlyswd.azurewebsites.net/api/authentication/register",
        {
          email: formData.email,
          password: formData.password,
          "full-name": formData.fullname,
          "telephone-number": formData.phoneNumber,
        }
      );
      if (response.status === 200) {
        enqueueSnackbar(
          "Registration successful! Please confirm your email before login !!!",
          {
            variant: "success",
            anchorOrigin: { horizontal: "right", vertical: "top" },
            preventDuplicate: true,
          }
        );
        navigate("/login");
      }
    } catch (error) {
      console.error("There was an error registering!", error);
      if (error.response) {
        const errorMessage = error.response.data.message;
        if (errorMessage) {
          enqueueSnackbar(errorMessage, {
            variant: "error",
            anchorOrigin: { horizontal: "right", vertical: "top" },
            preventDuplicate: true,
          });
        } else {
          enqueueSnackbar("An unknown error occurred during registration.", {
            variant: "error",
            anchorOrigin: { horizontal: "right", vertical: "top" },
            preventDuplicate: true,
          });
        }
      } else {
        enqueueSnackbar("Registration failed due to a server error.", {
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          preventDuplicate: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-[960px] relative bg-light-colors-white-light overflow-hidden flex flex-col items-center justify-start pt-[50px] px-0 pb-0 box-border gap-[50px] leading-[normal] tracking-[normal] text-left text-[38px] text-slate-900 font-body-medium mq675:gap-[25px]">
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="w-[535px] flex flex-col items-center justify-start py-0 px-5 box-border gap-[32px] max-w-full mq675:gap-[16px]">
        <div className="title-header flex-auto text-6xl leading-10">
          <span className="font-bold bg-gradient-custom-header-title bg-clip-text text-transparent">
            Z
          </span>
          <span className="bg-gradient-custom-header-title bg-clip-text text-transparent">
            odiacGems
          </span>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[20px] max-w-full text-11xl">
          <div className="flex flex-col items-start justify-start gap-[8px]">
            <div className="flex flex-row items-center justify-start">
              <a className="[text-decoration:none] relative tracking-[-0.01em] leading-[36px] font-semibold text-[inherit] inline-block min-w-[120px] mq450:text-[18px] mq450:leading-[22px] mq750:text-[24px] mq750:leading-[29px]">
                Register
              </a>
            </div>
            <div className="relative text-sm leading-[20px] text-slate-500">
              Enter your information to complete your account
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-center max-w-full">
            <form
              className="m-0 self-stretch flex flex-col items-center justify-center gap-[16px] max-w-full"
              onSubmit={handleSubmit}
            >
              <Input
                Content="Email Address"
                Placeholder="Enter your Email"
                name="email"
                inputType="email"
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <Input
                Content="Password"
                Placeholder="Enter your password"
                name="password"
                inputType="password"
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <Input
                Content="Confirm your password"
                Placeholder="Enter your password again"
                name="confirmPassword"
                inputType="password"
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
              <Input
                Content="Fullname"
                Placeholder="Enter your Fullname"
                name="fullname"
                inputType="text"
                onChange={handleChange}
              />
              <Input
                Content="TelephoneNumber"
                Placeholder="+84"
                name="phoneNumber"
                inputType="tel"
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
              <button
                type="submit"
                className="cursor-pointer [border:none] py-2 px-5 bg-slate-900 self-stretch rounded-md flex flex-row items-center justify-center hover:bg-darkslategray"
                disabled={!isFormValid}
              >
                <div className="relative text-sm leading-[24px] font-medium font-body-medium text-white text-left inline-block min-w-[56px]">
                  Register
                </div>
              </button>
            </form>
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
};

export default RegisterPage;
