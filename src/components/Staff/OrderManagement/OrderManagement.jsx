import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import DatePickerWithClearButton from "./DatePickerWithClearButton";
import Table from "./TableOrder";

function OrdersManagement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState("All");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchOrders();
  }, [date, status]);

  const fetchOrders = () => {
    setLoading(true);
    let url = "https://zodiacjewerlyswd.azurewebsites.net/api/orders";
    fetch(url, {
      method: "GET",
      headers: {
        accept: "*/*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const filteredData = data.data.filter((order) => {
            const matchesDate = date
              ? new Date(order["payment-date"]).toDateString() ===
                new Date(date).toDateString()
              : true;
            const matchesStatus =
              status === "All" || getStatusText(order.status) === status;
            return matchesDate && matchesStatus;
          });

          const transformedData = filteredData.map((order) => ({
            OrderNumber: order.id.toString(),
            Date: new Date(order["payment-date"]).toLocaleDateString(),
            Status: getStatusText(order.status),
            TotalPrice: "$0.00",
          }));
          setData(transformedData);
        } else {
          enqueueSnackbar("Failed to load orders", { variant: "error" });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        enqueueSnackbar("Failed to load orders", { variant: "error" });
        setLoading(false);
      });
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Completed";
      case 2:
        return "Pending";
      case 3:
        return "Shipped";
      case 4:
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const handleStatusChange = (event, newValue) => {
    setStatus(newValue);
  };

  return (
    <div>
      <div className="flex flex-row justify-between w-full items-center">
        <h1 className="font-serif text-[30px] w-[394px] relative text-inherit leading-[48px] font-bold font-inherit inline-block shrink-0 max-w-full mq450:text-[23px] mq450:leading-[29px] mq1050:text-11xl mq1050:leading-[38px]">
          Order Management
        </h1>
        <div className="datepicker-container">
          <DatePickerWithClearButton
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="Select Payment Date"
          />
        </div>
      </div>
      <Tabs
        value={status}
        onChange={handleStatusChange}
        aria-label="order status tabs"
      >
        <Tab value="All" label="All" />
        <Tab value="Completed" label="Completed" />
        <Tab value="Pending" label="Pending" />
        <Tab value="Shipped" label="Shipped" />
        <Tab value="Cancelled" label="Cancelled" />
      </Tabs>
      <section className="w-full mt-8">
        <Table data={data} />
      </section>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default OrdersManagement;
