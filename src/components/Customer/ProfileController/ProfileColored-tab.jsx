// ProfileColorTabs.jsx
import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useAuth } from "../../LoginController/AuthContext";
import AccountOrders from "./MyOrdered/MyOrderedData";
import Profile from "./profile/profile";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProfileColorTabs() {
  const { handleLogout } = useAuth();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "auto" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "30px" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary" // Set initial text color to secondary theme color
          indicatorColor="secondary" // Set initial indicator color to secondary theme color
          aria-label="secondary tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#b2b251", // Customize indicator color here
            },
            "& .Mui-selected": {
              color: "#b2b251 !important", // Customize text color for selected tab
            },
          }}
        >
          <Tab label="COMPLETED" {...a11yProps(0)} />
          <Tab label="PENDING" {...a11yProps(1)} />
          <Tab label="ACCOUNT DETAIL" {...a11yProps(2)} />
          {/* <Tab label="LOGOUT" {...a11yProps(3)} onClick={handleLogout} /> */}
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <AccountOrders status="COMPLETED" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AccountOrders status="PENDING" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Profile />
      </CustomTabPanel>
    </Box>
  );
}
