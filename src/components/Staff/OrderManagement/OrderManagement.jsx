import {
  Backdrop,
  CircularProgress,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import DatePickerWithClearButton from "./DatePickerWithClearButton";
import TableOrder from "./TableOrder";

function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(5); // Items per page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchOrders();
  }, [date, status, page, pageSize]);
  const fetchOrders = () => {
    setLoading(true);
    let url = `https://zodiacjewerlyswd.azurewebsites.net/api/orders?page=${page}&pageSize=${pageSize}`;

    if (status !== "All") {
      url += `&status=${getStatusValue(status)}`;
    }
    const token = localStorage.getItem("token");
    console.log("Fetching orders from:", url);
    fetch(url, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        if (data && data.data && Array.isArray(data.data["list-data"])) {
          let filteredOrders = data.data["list-data"];

          if (date) {
            const formattedDate = date.toISOString().split("T")[0];
            filteredOrders = filteredOrders.filter((order) => {
              const orderDate = new Date(order["payment-date"])
                .toISOString()
                .split("T")[0];
              return orderDate === formattedDate;
            });
          }

          const transformedData = filteredOrders.map((order) => ({
            OrderNumber: order.id.toString(),
            UserID: order["user-id"],
            UserName: order["user-name"],
            Date: order["payment-date"]
              ? new Date(order["payment-date"]).toLocaleDateString()
              : "N/A",
            Status: getStatusText(order.status),
            StatusColor: getStatusColor(order.status),
            TotalPrice: "$0.00",
          }));

          console.log("Transformed data:", transformedData);
          setOrders(transformedData);
          setTotalPages(data.data["total-page"]);
        } else {
          const errorMessage = data.message || "Failed to load orders";
          console.log("Error message:", errorMessage);
          enqueueSnackbar(errorMessage, { variant: "error" });
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error.message);
        enqueueSnackbar("Failed to load orders", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Pending";
      case 2:
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 2:
        return "green";
      case 1:
        return "orange";
      default:
        return "gray";
    }
  };

  const getStatusValue = (statusText) => {
    switch (statusText) {
      case "Completed":
        return 2;
      case "Pending":
        return 1;
      default:
        return null;
    }
  };

  const handleStatusChange = (event, newValue) => {
    setStatus(newValue);
    setPage(1); // Reset to first page when status changes
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1); // Reset to first page when page size changes
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
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#b2b251", // Customize indicator color here
          },
          "& .Mui-selected": {
            color: "#b2b251 !important", // Customize text color for selected tab
          },
        }}
      >
        <Tab value="All" label="All" />
        <Tab value="Completed" label="Completed" />
        <Tab value="Pending" label="Pending" />
      </Tabs>
      <section className="w-full mt-8">
        <TableOrder orders={orders} />
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#b2b251",
                color: "#fff",
              },
            }}
          />
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value={5}>5 per page</MenuItem>
            <MenuItem value={10}>10 per page</MenuItem>
            <MenuItem value={15}>15 per page</MenuItem>
          </Select>
        </Grid>
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
