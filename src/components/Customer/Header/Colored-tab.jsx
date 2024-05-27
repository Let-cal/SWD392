import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

export default function ColorTabs() {
  const [value, setValue] = useState("one");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <a href="#Collection" onClick={() => handleChange(null, "one")}>
            <ListItemText primary="Collection" />
          </a>
        </ListItem>
        <ListItem button>
          <a href="#For Man" onClick={() => handleChange(null, "two")}>
            <ListItemText primary="For Man" />
          </a>
        </ListItem>
        <ListItem button>
          <a href="#For Women" onClick={() => handleChange(null, "three")}>
            <ListItemText primary="For Women" />
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
          <Tab value="two" label="Collection" component="a" href="#man" />
          <Tab value="three" label="About" component="a" href="#women" />
        </Tabs>
      )}
    </Box>
  );
}
