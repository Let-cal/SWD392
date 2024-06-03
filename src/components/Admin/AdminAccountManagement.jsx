import AddCircleIcon from "@mui/icons-material/AddCircle";
import { CssBaseline } from "@mui/material";
import Button from "@mui/material/Button";
import "./AdminAccountManagement.css";
import Dashboard from "./ChartController/Dashboard.jsx";
import User from "./NumberOfUser.jsx";
const AdminAccountManagement = () => {
  return (
    <div className="w-full relative bg-background overflow-hidden flex flex-col items-start justify-start  box-border gap-[20px] leading-[normal] tracking-[normal] text-left text-19xl text-heading font-body-medium">
      <div className="self-stretch flex flex-row items-center justify-between max-w-full gap-[20px] font-urbanist mq750:flex-wrap">
        <h1 className="m-0 font-serif text-[30px] w-[394px] relative text-inherit leading-[48px] font-bold font-inherit inline-block shrink-0 max-w-full mq450:text-[23px] mq450:leading-[29px] mq1050:text-11xl mq1050:leading-[38px]">
          Account management
        </h1>
        <Button
          variant="contained"
          endIcon={<AddCircleIcon />}
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "gray",
            },
          }}
        >
          Create Staff
        </Button>
      </div>
      <nav className="m-0 self-stretch flex flex-row items-start justify-center gap-[24px] max-w-full whitespace-nowrap lg:flex-wrap">
        <User
          customer="Customer"
          accounts="628 accounts"
          propWidth="unset"
          propFlex="1"
          propMinWidth="211px"
          propWidth1="200px"
          propFontSize="20px"
        />
        <User
          customer="Staff"
          accounts="50 accounts"
          propWidth="unset"
          propFlex="1"
          propMinWidth="211px"
          propWidth1="200px"
          propFontSize="20px"
        />
        <User
          customer="Bought this month"
          accounts="825 accounts"
          propWidth="unset"
          propFlex="1"
          propMinWidth="211px"
          propWidth1="200px"
          propFontSize="20px"
        />
        <User
          customer="Joined this month"
          accounts="123 accounts"
          propWidth="unset"
          propFlex="1"
          propMinWidth="211px"
          propWidth1="200px"
          propFontSize="20px"
        />
      </nav>
      <div className="w-full shrink-0 mt-2.5 h-px bg-black border border-gray-300 border-solid"></div>
      <CssBaseline />
      <Dashboard />
    </div>
  );
};

export default AdminAccountManagement;
