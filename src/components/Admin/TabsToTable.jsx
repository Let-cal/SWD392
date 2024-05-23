import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import Table from "./Table.jsx";

const CustomTab = () => {
  const [selectedTab, setSelectedTab] = useState("0"); // Chuyển đổi thành chuỗi

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const customerData = [
    {
      userCode: "C0001",
      fullName: "Alice Johnson",
      email: "alice.johnson@domain.com",
      joinDate: "January 5, 2024",
      status: "Active",
    },
    {
      userCode: "C0002",
      fullName: "Bob Smith",
      email: "bob.smith@domain.com",
      joinDate: "February 12, 2023",
      status: "Inactive",
    },
    // Thêm dữ liệu khác cho Customer
  ];

  const staffData = [
    {
      userCode: "S0001",
      fullName: "John Doe",
      email: "john.doe@domain.com",
      joinDate: "March 10, 2023",
      status: "Inactive",
    },
    {
      userCode: "S0002",
      fullName: "Jane Smith",
      email: "jane.smith@domain.com",
      joinDate: "July 8, 2022",
      status: "Active",
    },
    // Thêm dữ liệu khác cho Staff
  ];

  return (
    <div className="">
      <TabContext value={selectedTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="0" label="All" />
            <Tab value="1" label="Customer" />
            <Tab value="2" label="Staff" />
          </TabList>
        </Box>
        <TabPanel value="0">
          <Table data={customerData} />
          <Table data={staffData} />
        </TabPanel>
        <TabPanel value="1">
          <Table data={customerData} />
        </TabPanel>
        <TabPanel value="2">
          <Table data={staffData} />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default CustomTab;
