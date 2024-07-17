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

  useEffect(() => {
    const fetchAllOrders = async () => {
      setLoading(true);
      let allOrders = [];
      let currentPage = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        let url = `https://zodiacjewerlyswd.azurewebsites.net/api/orders?page=${currentPage}&pageSize=100`;

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
                date: format(
                  new Date(order["payment-date"]),
                  "dd/MM/yyyy HH:mm"
                ),
                status: getStatusText(order.status),
              }));
            allOrders = [...allOrders, ...filteredOrders];
            currentPage++;
          } else {
            hasMorePages = false;
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
          hasMorePages = false;
        }
      }

      setAllOrdersData(allOrders);
      setLoading(false);
    };

    fetchAllOrders();
  }, [userHint, token]);

  const filteredAndSortedOrders = useMemo(() => {
    return allOrdersData
      .filter((order) => status === "All" || order.status === status)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
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
