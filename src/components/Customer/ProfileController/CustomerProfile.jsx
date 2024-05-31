

import ProfileContent from "./ProfileContent";

const testOrders = [
  {
    orderNumber: "7643980998990",
    date: "October 8, 2021",
    status: "Delivered",
    total: "$105",
  },
  {
    orderNumber: "943980998990",
    date: "October 8, 2021",
    status: "Processing",
    total: "$100",
  },
  {
    orderNumber: "879980998990",
    date: "October 8, 2020",
    status: "Delivered",
    total: "$65",
  },
  {
    orderNumber: "1234567890123",
    date: "November 20, 2022",
    status: "Shipped",
    total: "$150",
  },
  {
    orderNumber: "9876543210987",
    date: "December 15, 2022",
    status: "Cancelled",
    total: "$0",
  },
];

const AccountOrders = () => {
  return <ProfileContent orders={testOrders} />;
};

export default AccountOrders;
