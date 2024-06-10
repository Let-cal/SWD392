import { CssBaseline } from "@mui/material";
import Dashboard from "./ChartController/Dashboard.jsx";
import Product from "./NumberOfProduct.jsx";
import "./StaffAccountManagement.css";
const StaffAccountManagement = () => {
  return (
    <div className="w-full relative bg-background overflow-hidden flex flex-col items-start justify-start  box-border gap-[20px] leading-[normal] tracking-[normal] text-left text-19xl text-heading font-body-medium">
      <div className="self-stretch flex flex-row items-center justify-between max-w-full gap-[20px] font-urbanist mq750:flex-wrap">
        <h1 className="m-0 font-serif text-[30px] w-[394px] relative text-inherit leading-[48px] font-bold font-inherit inline-block shrink-0 max-w-full mq450:text-[23px] mq450:leading-[29px] mq1050:text-11xl mq1050:leading-[38px]">
          Staff Page
        </h1>
      </div>
      <nav className="m-0 self-stretch flex flex-row items-start justify-center gap-[24px] max-w-full whitespace-nowrap lg:flex-wrap">
        <Product
          ProductName="Tredding Product of Name"
          NumOfProducts="628 Products"
          propWidth="unset"
          propFlex="1"
          propMinWidth="211px"
          propWidth1="220px"
          propFontSize="20px"
        />
        <Product
          ProductName="Transaction has been refunded"
          NumOfProducts="50 Products"
          propWidth="unset"
          propFlex="1"
          propMinWidth="211px"
          propWidth1="220px"
          propFontSize="20px"
        />
        <Product
          ProductName="Bought this month"
          NumOfProducts="825 Products"
          propWidth="unset"
          propFlex="1"
          propMinWidth="211px"
          propWidth1="220px"
          propFontSize="20px"
        />
        <Product
          ProductName="Bought this year"
          NumOfProducts="123 Products"
          propWidth="unset"
          propFlex="1"
          propMinWidth="211px"
          propWidth1="220px"
          propFontSize="20px"
        />
      </nav>
      <div className="w-full shrink-0 mt-2.5 h-px bg-black border border-gray-300 border-solid"></div>
      <CssBaseline />
      <Dashboard />
    </div>
  );
};

export default StaffAccountManagement;
