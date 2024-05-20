import CollectionsIcon from "@mui/icons-material/Collections"; // Placeholder icon for collection
import CoupleIcon from "@mui/icons-material/Favorite"; // Placeholder icon for couple
import ManIcon from "@mui/icons-material/Man"; // Placeholder icon for man
import WomanIcon from "@mui/icons-material/Woman"; // Placeholder icon for woman
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/system";
import React from "react";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const items = [
    { text: "For man", icon: <ManIcon />, href: "#man" },
    { text: "For women", icon: <WomanIcon />, href: "#women" },
    { text: "For collection", icon: <CollectionsIcon />, href: "#collection" },
  ];

  const footerItems = [
    { text: "For couple", icon: <CoupleIcon />, href: "#couple" },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {items.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <a
              href={item.href}
              className="flex items-center p-2 text-base transition duration-300 ease-in-out transform hover:scale-125"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </a>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {footerItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <a
              href={item.href}
              className="flex items-center p-2 text-base transition duration-300 ease-in-out transform hover:scale-125"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </a>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const NavButton = styled(Button)(({ theme }) => ({
    padding: 0,
    margin: 0,
    transition: "all 0.3s ease-in-out",
    transform: "scale(1)",
    "&:hover": {
      transform: "scale(1.25)",
    },
  }));

  return (
    <div>
      <NavButton onClick={toggleDrawer(true)}>Shop</NavButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}