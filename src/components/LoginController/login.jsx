import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios"; // Thêm axios để gọi API
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng sau khi đăng nhập thành công

function ImageSection() {
  return (
    <div className="flex flex-col w-3/5 max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden relative flex-col grow items-start px-2.5 pt-2.5 pb-2 text-lg font-bold leading-6 text-white min-h-[957px] max-md:pr-5 max-md:mt-1.5 max-md:max-w-full">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e72ce113c5d66445a226f72157f39a07db7af460fe67d968c265e744a21607c0?apiKey=2cf111b7142f4a06bfb2b5c186f14037&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e72ce113c5d66445a226f72157f39a07db7af460fe67d968c265e744a21607c0?apiKey=2cf111b7142f4a06bfb2b5c186f14037&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e72ce113c5d66445a226f72157f39a07db7af460fe67d968c265e744a21607c0?apiKey=2cf111b7142f4a06bfb2b5c186f14037&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e72ce113c5d66445a226f72157f39a07db7af460fe67d968c265e744a21607c0?apiKey=2cf111b7142f4a06bfb2b5c186f14037&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e72ce113c5d66445a226f72157f39a07db7af460fe67d968c265e744a21607c0?apiKey=2cf111b7142f4a06bfb2b5c186f14037&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e72ce113c5d66445a226f72157f39a07db7af460fe67d968c265e744a21607c0?apiKey=2cf111b7142f4a06bfb2b5c186f14037&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e72ce113c5d66445a226f72157f39a07db7af460fe67d968c265e744a21607c0?apiKey=2cf111b7142f4a06bfb2b5c186f14037&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e72ce113c5d66445a226f72157f39a07db7af460fe67d968c265e744a21607c0?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative flex-col justify-center max-w-full mt-[778px] w-[500px] max-md:mt-10">
          <div className="justify-center p-2.5 max-md:max-w-full">
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
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" }); // Thêm state để lưu trữ email và password
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate(); // Sử dụng để điều hướng sau khi đăng nhập thành công
  const { enqueueSnackbar } = useSnackbar(); // Sử dụng để hiển thị thông báo

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

    const requestBody = {
      userName: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        "https://zodiacjewerly.azurewebsites.net/api/Authen/Login",
        requestBody
      );

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.roleId);
        localStorage.setItem("userId", response.data.username);

        enqueueSnackbar("Đăng nhập thành công", {
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          preventDuplicate: true,
        });

        navigate("/");
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      enqueueSnackbar("Email hoặc mật khẩu không đúng. Vui lòng thử lại.", {
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
        preventDuplicate: true,
      });
    }
  };

  return (
    <div className="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow justify-center px-16 w-full bg-white max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col mx-8 mt-56 max-md:mx-2.5 max-md:mt-10">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col">
              <div className="justify-center text-3xl font-semibold tracking-tight leading-9 text-slate-900">
                Welcome back !
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
                      value={formData.email} // Thêm giá trị từ state
                      onChange={handleChange} // Thêm hàm xử lý thay đổi
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
                    value={formData.password} // Thêm giá trị từ state
                    onChange={handleChange} // Thêm hàm xử lý thay đổi
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
              <div className="flex gap-2 items-center self-start mt-4 text-sm font-medium leading-4 text-slate-500">
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
                className="flex justify-center items-center px-4 py-2 mt-4 text-sm font-medium leading-6 text-white rounded-md bg-slate-900 max-md:px-5"
              >
                Log in
              </button>
            </div>
          </form>
          <Link
            to="/forgot-password"
            className="self-center mt-5 text-sm leading-5 underline text-slate-500"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

function Login() {
  return (
    <div className="flex flex-col justify-center">
      <div className="w-full bg-white max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <ImageSection />
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
