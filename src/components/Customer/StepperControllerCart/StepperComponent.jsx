import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const steps = ["View Cart", "Checkout", "Payment"];

function CheckoutStepper() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveStep = () => {
    switch (location.pathname) {
      case "/viewcart":
        return 0;
      case "/checkout":
        return 1;
      case "/payment":
        return 2;
      default:
        return 0;
    }
  };

  const handleBack = () => {
    const activeStep = getActiveStep();
    if (activeStep === 0) {
      navigate("/customer-page");
    } else if (activeStep === 2) {
      navigate("/checkout");
    } else if (activeStep === 1) {
      navigate("/viewcart");
    }
  };

  return (
    <Box sx={{ width: "100%", mb: 4, mt: 6 }}>
      <Stepper activeStep={getActiveStep()}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: "black", // Change the circle (StepIcon) color to black
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button variant="text" color="error" onClick={handleBack}>
          {getActiveStep() === 0 ? "Back to Home" : "Back"}
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
      </Box>
    </Box>
  );
}

export default CheckoutStepper;
