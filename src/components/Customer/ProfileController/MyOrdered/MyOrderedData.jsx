import ProfileContent from "./MyOrderedTable";

const ordersData = [
  {
    orderNumber: "ORD123",
    date: "2024-06-01",
    status: "Delivered",
    total: "$120.00",
  },
  {
    orderNumber: "ORD124",
    date: "2024-05-25",
    status: "Processing",
    total: "$80.50",
  },
  {
    orderNumber: "ORD125",
    date: "2024-05-18",
    status: "Shipped",
    total: "$45.75",
  },
  {
    orderNumber: "ORD126",
    date: "2024-05-10",
    status: "Cancelled",
    total: "$60.25",
  },
];

const AccountOrders = () => {
  return <ProfileContent orders={ordersData} />;
};

export default AccountOrders;
