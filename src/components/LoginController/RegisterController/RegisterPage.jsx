import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./InputForm";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Invalid email format!");
      console.log(formData.email);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "https://zodiacjewerly.azurewebsites.net/api/Authen/Register",
        {
          email: formData.email,
          password: formData.password,
          fullName: formData.fullname,
          telephoneNumber: formData.phoneNumber,
        }
      );
      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("There was an error registering!", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
      alert("Registration failed!");
    }
  };

  return (
    <div className="w-full h-[960px] relative bg-light-colors-white-light overflow-hidden flex flex-col items-center justify-start pt-[50px] px-0 pb-0 box-border gap-[50px] leading-[normal] tracking-[normal] text-left text-[38px] text-slate-900 font-body-medium mq675:gap-[25px]">
      <div className="w-[535px] flex flex-col items-center justify-start py-0 px-5 box-border gap-[32px] max-w-full mq675:gap-[16px]">
        <h1 className="m-0 relative text-inherit leading-[48px] font-semibold font-inherit mq450:text-[23px] mq450:leading-[29px] mq750:text-11xl mq750:leading-[38px]">
          ZodiacGems
        </h1>
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
                propMinWidth="66px"
                name="email"
                inputType="email" // Đảm bảo input type là email
                onChange={handleChange}
              />
              <Input
                className="Password"
                Content="Password"
                Placeholder="Enter your password"
                propMinWidth="200px"
                isPassword={true}
                name="password"
                onChange={handleChange}
              />
              <Input
                className="Confirm"
                Content="Confirm your password"
                Placeholder="Enter your password again"
                propMinWidth="200px"
                isPassword={true}
                name="confirmPassword"
                onChange={handleChange}
              />
              <Input
                className="Fullname"
                Content="Fullname"
                Placeholder="Enter your Fullname"
                propMinWidth="200px"
                name="fullname"
                inputType="text" // Đảm bảo input type là text
                onChange={handleChange}
              />
              <Input
                className="PhoneNumber"
                Content="TelephoneNumber"
                Placeholder="+84"
                propMinWidth="200px"
                name="phoneNumber"
                inputType="text" // Đảm bảo input type là text
                onChange={handleChange}
              />
              <button
                type="submit"
                className="cursor-pointer [border:none] py-2 px-5 bg-slate-900 self-stretch rounded-md flex flex-row items-center justify-center hover:bg-darkslategray"
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
