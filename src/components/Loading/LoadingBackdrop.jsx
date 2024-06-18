import StarIcon from "@mui/icons-material/Star"; // Import ngôi sao từ Material-UI
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import "./LoadingBackdrop.css"; // Import CSS cho animation

// eslint-disable-next-line react/prop-types
const LoadingBackdrop = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Box position="relative">
        <CircularProgress color="inherit" />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <StarIcon className="star-animation" fontSize="medium" />
        </Box>
      </Box>
    </Backdrop>
  );
};

export default LoadingBackdrop;
