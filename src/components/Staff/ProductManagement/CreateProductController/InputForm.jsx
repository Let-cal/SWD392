import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { useMemo } from "react";

const Input = ({
  className = "",
  Content,
  Placeholder,
  propMinWidth,
  name,
  onChange,
}) => {
  const FormStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[6px] max-w-full text-left text-sm text-slate-900 font-body-medium ${className}`}
    >
      <div
        className="font-semibold relative leading-[20px]  inline-block min-w-[36px]"
        style={FormStyle}
      >
        {Content}
      </div>
      <div className="self-stretch flex flex-row items-start justify-start gap-[8px] max-w-full text-light-colors-white-light">
        <div className="flex-1 flex flex-col items-start justify-start max-w-full">
          <div className="w-full flex flex-col justify-center">
            <TextField
              name={name}
              type="text"
              placeholder={Placeholder}
              variant="outlined"
              fullWidth
              onChange={onChange}
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
      <div className="w-[164px] relative leading-[20px] text-slate-500 hidden">
        Enter your {Content.toLowerCase()}
      </div>
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  Content: PropTypes.string,
  Placeholder: PropTypes.string,
  propMinWidth: PropTypes.any,
  inputType: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
