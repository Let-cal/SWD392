import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
const Input = ({
  className = "",
  ResetPass,
  ResetPassPlaceholder,
  propMinWidth,
  propWidth,
  value, // Thêm prop value
  onChange, // Thêm prop onChange
}) => {
  const [showPassword, setShowPassword] = useState(false); // Quản lý trạng thái hiển thị/nghỉ chế độ ẩn mật khẩu

  const ResetPassStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const ResetPass1Style = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[6px] max-w-full text-left text-sm text-slate-900 font-body-medium ${className}`}
    >
      <div
        className="relative leading-[20px] font-medium inline-block min-w-[100px]"
        style={ResetPassStyle}
      >
        {ResetPass}
      </div>
      <div className="self-stretch flex flex-row items-start justify-start gap-[8px] max-w-full text-light-colors-white-light">
        <div className="flex-1 flex flex-col items-start justify-start max-w-full">
          <TextField
            className="w-full [border:none] [outline:none] text-black font-body-medium text-base bg-[transparent] h-6 relative leading-[24px] text-left inline-block p-0"
            placeholder={ResetPassPlaceholder}
            type={showPassword ? "text" : "password"} // Điều chỉnh loại input dựa trên trạng thái showPassword
            style={ResetPass1Style}
            value={value} // Sử dụng prop value
            onChange={onChange} // Sử dụng prop onChange
            variant="outlined" // Thay đổi variant thành "outlined" để giống với login.jsx
            size="small" // Thay đổi size thành "small" để phù hợp với design
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="rounded-md bg-slate-900 hidden flex-row items-center justify-center py-2 px-4">
          <div className="relative leading-[24px] font-medium">Subscribe</div>
        </div>
      </div>
      <div className="w-[164px] relative leading-[20px] text-slate-500 hidden">
        Enter your ResetPass address
      </div>
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  ResetPass: PropTypes.string,
  ResetPassPlaceholder: PropTypes.string,
  propMinWidth: PropTypes.any,
  propWidth: PropTypes.any,
  value: PropTypes.string, // Thêm định nghĩa PropTypes cho value
  onChange: PropTypes.func, // Thêm định nghĩa PropTypes cho onChange
};

export default Input;
