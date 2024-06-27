import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Backdrop,
  Checkbox,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
function ImageSection() {
  return (
    <div className="flex flex-col w-3/5 max-md:w-full ">
      <div className="relative flex flex-col grow items-start px-2.5 pt-2.5 pb-2 text-lg  leading-6 text-white min-h-screen">
        <img
          loading="lazy"
          srcSet="/images/Frame.png"
          className="object-cover absolute inset-0 w-full h-full "
        />
        <div className="relative flex flex-col justify-center mt-auto mb-5 w-full max-md:mt-10">
          <div className="justify-center p-2.5 pr-[20%] max-md:pr-0 max-md:max-w-full font-serif">
            &quot;Discover the beauty of destiny – Connect your love through
            each zodiac sign, made for couples! Celebrate your unique bond with
            personalized astrological jewelry.&quot;
          </div>
        </div>
      </div>
    </div>
  );
}
function LoginForm() {
  const { setIsAuthenticated, setUserRole } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setFormData({ email: savedEmail, password: savedPassword });
    }
  }, []);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const requestBody = { email: formData.email, password: formData.password };
    try {
      const response = await axios.post(
        "https://zodiacjewerlyswd.azurewebsites.net/api/authentication/login",
        requestBody
      );

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userName", response.data.fullName);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("hint", response.data.hint);
        const userHint = localStorage.getItem("hint");
        console.log(userHint);
        if (checked) {
          localStorage.setItem("password", formData.password);
        } else {
          localStorage.removeItem("password");
        }

        setIsAuthenticated(true);
        setUserRole(response.data.role);

        enqueueSnackbar("Logged in successfully", {
          variant: "success",
          preventDuplicate: true,
        });

        if (response.data.role === "Admin") {
          navigate("/AdminPage");
        } else if (response.data.role === "Customer") {
          navigate("/customer-page");
        } else {
          navigate("/StaffPage");
        }
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      enqueueSnackbar("Email or password is incorrect. Please try again.", {
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
        preventDuplicate: true,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="flex flex-col grow justify-center px-16 w-full bg-white max-md:px-5 min-h-screen">
        <div className="flex flex-col mx-8 mt-auto mb-32 max-md:mx-2.5 max-md:mt-10">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col">
              <div className="text-3xl font-semibold tracking-tight leading-9 text-slate-900">
                Welcome back!
              </div>
              <div className="mt-2 text-sm leading-5 text-slate-500">
                Enter to get variant access to data & information
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <div className="flex flex-col whitespace-nowrap">
                <div className="text-sm font-medium leading-5 text-slate-900">
                  Email
                </div>
                <div className="flex flex-col justify-center mt-1.5 text-base leading-6 text-slate-400">
                  <div className="flex flex-col justify-center">
                    <TextField
                      name="email"
                      type="email"
                      placeholder="Email"
                      variant="outlined"
                      fullWidth
                      value={formData.email}
                      onChange={handleChange}
                      sx={{
                        height: "44px",
                        "& .MuiOutlinedInput-root": {
                          height: "100%",
                          "& input": {
                            height: "100%",
                            boxSizing: "border-box",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-4 whitespace-nowrap">
                <div className="text-sm font-medium leading-5 text-slate-900">
                  Password
                </div>
                <div className="flex flex-col justify-center mt-4">
                  <TextField
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    variant="outlined"
                    fullWidth
                    value={formData.password}
                    onChange={handleChange}
                    sx={{
                      height: "44px",
                      "& .MuiOutlinedInput-root": {
                        height: "100%",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm font-medium leading-4 text-slate-500">
                <Checkbox
                  name="rememberMe"
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      width: "1.75rem",
                      height: "1.75rem",
                    },
                    "&.Mui-checked .MuiSvgIcon-root": {
                      fill: "green",
                    },
                  }}
                />
                <div>Remember me</div>
              </div>
              <button
                type="submit"
                className="flex justify-center items-center px-4 py-2 mt-4 text-sm font-medium leading-6 text-white bg-slate-900 rounded-md max-md:px-5"
              >
                Log in
              </button>
            </div>
          </form>
          <Link
            to="/Forgot-PasswordPage"
            className="self-center mt-5 text-sm leading-5 text-slate-500 underline"
          >
            Forgot password?
          </Link>
          <Link
            to="/Register-page"
            className="self-center mt-5 text-sm leading-5 text-slate-500 underline"
          >
            Register right now!!! If you don’t have account.
          </Link>
        </div>
      </div>
    </div>
  );
}

function Login() {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="w-full bg-white">
        <div className="flex flex-row gap-5 max-md:flex-col max-md:gap-0 min-h-screen">
          <ImageSection />
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
