import { Collections, Home, Info, Shop } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ColorTabs({ scrollToTrustedCompanies }) {
  const [value, setValue] = useState("one");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/customer-page") {
      setValue("one");
    } else if (location.pathname.includes("#Collection")) {
      setValue("two");
    } else if (location.pathname.includes("/AboutPage")) {
      setValue("three");
    } else if (location.pathname.includes("/")) {
      setValue("three");
    } else {
      setValue(false);
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "four") {
      scrollToTrustedCompanies();
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <a
            href="/customer-page"
            onClick={() => handleChange(null, "one")}
            className="flex flex-row items-center items-center"
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home Page" />
          </a>
        </ListItem>
        <ListItem button>
          <a
            href="#Collection"
            onClick={() => handleChange(null, "two")}
            className="flex flex-row items-center"
          >
            <ListItemIcon>
              <Collections />
            </ListItemIcon>
            <ListItemText primary="Collection" />
          </a>
        </ListItem>
        <ListItem button>
          <a
            href="/AboutPage"
            onClick={() => handleChange(null, "three")}
            className="flex flex-row items-center"
          >
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="About" />
          </a>
        </ListItem>
        <ListItem button>
          <a
            href="#"
            onClick={() => handleChange(null, "four")}
            className="flex flex-row items-center"
          >
            <ListItemIcon>
              <Shop />
            </ListItemIcon>
            <ListItemText primary="Shop" />
          </a>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ width: "auto" }}>
      {isMobile ? (
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            {drawerList}
          </Drawer>
        </>
      ) : (
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab
            value="one"
            label="Home Page"
            component="a"
            href="/customer-page"
          />
          <Tab
            value="two"
            label="Collection"
            component="a"
            href="#Collection"
          />
          <Tab value="three" label="About" component="a" href="/AboutPage" />
          <Tab
            value="four"
            label="Shop"
            onClick={(event) => {
              event.preventDefault();
              handleChange(event, "four");
            }}
          />
        </Tabs>
      )}
    </Box>
  );
}

ColorTabs.propTypes = {
  scrollToTrustedCompanies: PropTypes.func.isRequired,
};

export default ColorTabs;
