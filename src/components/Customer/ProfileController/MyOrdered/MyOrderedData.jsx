import { Grid, MenuItem, Pagination, Select } from "@mui/material";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ProfileContent from "./MyOrderedTable";

const AccountOrders = ({ status }) => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");
  console.log(token);
  const userHint = localStorage.getItem("hint");
  const sort = userHint || 8; // Default to 8 if no hint is found

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      let url = `https://zodiacjewerlyswd.azurewebsites.net/api/orders?page=${page}&pageSize=${pageSize}`;
      if (status !== "All") {
        url += `&status=${getStatusValue(status)}`;
      }
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.success) {
          const filteredOrders = result.data["list-data"]
            .filter(
              (order) =>
                order["user-id"] == userHint &&
                getStatusText(order.status) === status
            )
            .map((order) => ({
              orderNumber: order.id.toString(), // Convert to string
              date: format(new Date(order["payment-date"]), "dd/MM/yyyy HH:mm"), // Format date
              status: getStatusText(order.status),
            }));
          setOrdersData(filteredOrders);
          setTotalPages(result.data["total-page"]); // Set total pages from API response
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [status, page, pageSize, sort]);
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
  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "PENDING";
      case 2:
        return "COMPLETED";
      default:
        return "UNKNOWN";
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1); // Reset to first page when page size changes
  };

  return (
    <>
      <ProfileContent orders={ordersData} loading={loading} />
      <Grid container justifyContent="space-between" alignItems="center" mt={2}>
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
    </>
  );
};

AccountOrders.propTypes = {
  status: PropTypes.string.isRequired,
};

export default AccountOrders;
