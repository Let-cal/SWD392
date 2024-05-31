import { useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PropTypes from 'prop-types';

const Input = ({ className = '', Content, Placeholder, propMinWidth, isPassword = false, inputType = 'text', name, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const FormStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div className={`self-stretch flex flex-col items-start justify-start gap-[6px] max-w-full text-left text-sm text-slate-900 font-body-medium ${className}`}>
      <div className="relative leading-[20px] font-medium inline-block min-w-[36px]" style={FormStyle}>
        {Content}
      </div>
      <div className="self-stretch flex flex-row items-start justify-start gap-[8px] max-w-full text-light-colors-white-light">
        <div className="flex-1 flex flex-col items-start justify-start max-w-full">
          <div className="w-full flex flex-col justify-center">
            <TextField
              name={name}
              type={isPassword ? (showPassword ? 'text' : 'password') : inputType}
              placeholder={Placeholder}
              variant="outlined"
              fullWidth
              onChange={onChange}
              sx={{
                height: '44px',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  '& input': {
                    height: '100%',
                    boxSizing: 'border-box',
                  },
                },
              }}
              InputProps={
                isPassword
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                  : {}
              }
            />
          </div>
        </div>
        <div className="rounded-md bg-slate-900 hidden flex-row items-center justify-center py-2 px-4">
          <div className="relative leading-[24px] font-medium">Subscribe</div>
        </div>
      </div>
      <div className="w-[164px] relative leading-[20px] text-slate-500 hidden">
        Enter your Content address
      </div>
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  Content: PropTypes.string,
  Placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  propMinWidth: PropTypes.any,
  inputType: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
