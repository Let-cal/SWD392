import { Grid, MenuItem, Pagination, Select } from "@mui/material";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import ProfileContent from "./MyOrderedTable";

const AccountOrders = ({ status }) => {
  const [allOrdersData, setAllOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const token = localStorage.getItem("token");
  const userHint = localStorage.getItem("hint");
  console.log(status);
  useEffect(() => {
    const fetchAllOrders = async () => {
      setLoading(true);
      let allOrders = [];
      let currentPage = 1;
      let hasMorePages = true;
      console.log("token: " + token);
      while (hasMorePages) {
        let url = `https://zodiacjewerlyswd.azurewebsites.net/api/orders?page=${currentPage}&pageSize=100&status=${getStatusValue(
          status
        )}`;
        console.log(url);
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await response.json();
          if (result.success && result.data["list-data"].length > 0) {
            const filteredOrders = result.data["list-data"]
              .filter((order) => order["user-id"] == userHint)
              .map((order) => ({
                orderNumber: order.id.toString(),
                paymentDate: order["payment-date"]
                  ? new Date(order["payment-date"])
                  : null,
                status: getStatusText(order.status),
              }));
            allOrders = [...allOrders, ...filteredOrders];
            console.log(allOrders);
            currentPage++;
          } else {
            hasMorePages = false;
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
          hasMorePages = false;
        }
      }

      // Sort the orders by paymentDate and take the latest 10 orders
      const sortedOrders = allOrders.sort((a, b) => {
        if (a.paymentDate && b.paymentDate) {
          return b.paymentDate - a.paymentDate;
        } else if (a.paymentDate) {
          return -1;
        } else {
          return 1;
        }
      });
      const latestOrders = sortedOrders.slice(0, 10).map((order) => ({
        ...order,
        date: order.paymentDate
          ? format(order.paymentDate, "dd/MM/yyyy HH:mm")
          : "Not payment yet",
      }));

      setAllOrdersData(latestOrders);
      setLoading(false);
    };

    fetchAllOrders();
  }, [userHint, token]);

  const filteredAndSortedOrders = useMemo(() => {
    return allOrdersData.filter(
      (order) => status === "All" || order.status === status
    );
  }, [allOrdersData, status]);

  const totalPages = Math.ceil(filteredAndSortedOrders.length / pageSize);

  const paginatedOrders = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredAndSortedOrders.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedOrders, page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);
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
  const getStatusValue = (statusText) => {
    switch (statusText) {
      case "COMPLETED":
        return 2;
      case "PENDING":
        return 1;
      default:
        return null;
    }
  };
  return (
    <>
      <ProfileContent orders={paginatedOrders} loading={loading} />
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
