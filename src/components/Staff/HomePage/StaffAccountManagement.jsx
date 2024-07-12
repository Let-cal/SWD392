import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import Dashboard from "./ChartController/Dashboard.jsx";
import StatisticsCard from "./StatisticsCard.jsx";

const fetchUserCount = (role) => async () => {
  const response = await fetch(
    `https://zodiacjewerlyswd.azurewebsites.net/api/users/role/${role}`
  );
  const data = await response.json();
  return `${data.data["user-count"]} ${
    role === "Customer" ? "accounts" : "accounts"
  }`;
};

const fetchProductStatistics = async () => {
  const response = await fetch(
    "https://zodiacjewerlyswd.azurewebsites.net/api/products/statistics"
  );
  const data = await response.json();
  return `${data.data["total-products"]} products`;
};

const fetchProductsSold = async () => {
  const response = await fetch(
    "https://zodiacjewerlyswd.azurewebsites.net/api/products/statistics"
  );
  const data = await response.json();
  return `${data.data["product-sold-this-month"]} products`;
};

const StaffAccountManagement = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="w-full relative bg-background overflow-hidden flex flex-col items-start justify-start box-border gap-[20px] leading-[normal] tracking-[normal] text-left text-19xl text-heading font-body-medium">
        <div className="self-stretch flex flex-row items-center justify-between max-w-full gap-[20px] font-urbanist mq750:flex-wrap">
          <h1 className="m-0 font-serif text-[30px] w-[394px] relative text-inherit leading-[48px] font-bold font-inherit inline-block shrink-0 max-w-full mq450:text-[23px] mq450:leading-[29px] mq1050:text-11xl mq1050:leading-[38px]">
            Account management
          </h1>
        </div>
        <nav className="m-0 self-stretch flex flex-row items-start justify-center gap-[24px] max-w-full whitespace-nowrap lg:flex-wrap">
          <StatisticsCard
            title="Customer"
            fetchData={fetchUserCount("Customer")}
            iconSrc1="https://cdn.lordicon.com/hrjifpbq.json"
            iconSrc2="https://cdn.lordicon.com/qhkvfxpn.json"
            propWidth="unset"
            propFlex="1"
            propMinWidth="211px"
            propWidth1="220px"
            propFontSize="20px"
          />
          <StatisticsCard
            title="Staff"
            fetchData={fetchUserCount("Staff")}
            iconSrc1="https://cdn.lordicon.com/hrjifpbq.json"
            iconSrc2="https://cdn.lordicon.com/qhkvfxpn.json"
            propWidth="unset"
            propFlex="1"
            propMinWidth="211px"
            propWidth1="220px"
            propFontSize="20px"
          />
          <StatisticsCard
            title="Total Products"
            fetchData={fetchProductStatistics}
            iconSrc1="https://cdn.lordicon.com/mqdkoaef.json"
            iconSrc2="https://cdn.lordicon.com/qhkvfxpn.json"
            propWidth="unset"
            propFlex="1"
            propMinWidth="211px"
            propWidth1="220px"
            propFontSize="20px"
          />
          <StatisticsCard
            title="Product Sold This Month"
            fetchData={fetchProductsSold}
            iconSrc1="https://cdn.lordicon.com/mqdkoaef.json"
            iconSrc2="https://cdn.lordicon.com/qhkvfxpn.json"
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
    </SnackbarProvider>
  );
};

export default StaffAccountManagement;
