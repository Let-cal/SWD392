import { format } from "date-fns";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ProfileContent from "./MyOrderedTable";
const AccountOrders = ({ status }) => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://zodiacjewerly.azurewebsites.net/api/orders",
          {
            method: "GET",
            headers: {
              accept: "*/*",
            },
          }
        );
        const result = await response.json();
        if (result.success) {
          const userHint = localStorage.getItem("hint");
          const filteredOrders = result.data
            .filter(
              (order) =>
                order["user-id"] == userHint &&
                getStatusText(order.status) === status
            )
            .map((order) => ({
              orderNumber: order.id.toString(), // Chuyển đổi thành chuỗi
              date: format(new Date(order["payment-date"]), "dd/MM/yyyy HH:mm"), // Định dạng ngày
              status: getStatusText(order.status),
              total: calculateTotal(order), // Giả sử bạn có logic để tính toán tổng giá trị đơn hàng
            }));
          setOrdersData(filteredOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [status]);

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "COMPLETED";
      case 1:
        return "PROCESSING";
      case 2:
        return "CANCELLED";
      default:
        return "UNKNOWN";
    }
  };

  const calculateTotal = () => {
    // Logic để tính tổng giá trị đơn hàng, nếu có
    return "0"; // Giả sử mặc định là 0
  };

  return <ProfileContent orders={ordersData} loading={loading} />;
};
AccountOrders.propTypes = {
  status: PropTypes.string.isRequired,
};
export default AccountOrders;
