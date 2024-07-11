import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./sidebar.css";

function Sidebar({
  selectedContent,
  setSelectedContent,
  setIsSidebarCollapsed,
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setIsSidebarCollapsed(isCollapsed);
  }, [isCollapsed, setIsSidebarCollapsed]);

  const toggleSidebar = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setTimeout(() => {
        setShowText(true);
      }, 1); // Adjust this delay to sync with your sidebar transition duration
    } else {
      setShowText(false);
      setTimeout(() => {
        setIsCollapsed(true);
      }, 1); // Adjust this delay to sync with your sidebar transition duration
    }
  };

  return (
    <div className={`sidebar  ${isCollapsed ? "collapsed" : ""}`}>
      <div className="title-header-Admin bg-gray-100 shadow-md h-[88px] flex items-center justify-between">
        <div className="flex items-center">
          <MenuIcon onClick={toggleSidebar} className="menu-icon" />
          <span className="font-bold">A</span>
          <span className={`text-Admin ${showText ? "show" : ""}`}>dmin</span>
        </div>
      </div>
      <Divider />
      <ul className="sidebar-nav">
        <li
          onClick={() => setSelectedContent("HomePage")}
          className={selectedContent === "HomePage" ? "active" : ""}
        >
          <a>
            <HomeIcon />
            <span className={`text-Admin ${showText ? "show" : ""}`}>
              {" "}
              Home Page
            </span>
          </a>
        </li>
        <li
          onClick={() => setSelectedContent("OrdersManagement")}
          className={selectedContent === "OrdersManagement" ? "active" : ""}
        >
          <a>
            <ManageSearchIcon />
            <span className={`text-Admin ${showText ? "show" : ""}`}>
              {" "}
              Orders Management
            </span>
          </a>
        </li>
        <li
          onClick={() => setSelectedContent("ProductsManagement")}
          className={selectedContent === "ProductsManagement" ? "active" : ""}
        >
          <a>
            <ShoppingBagIcon />
            <span className={`text-Admin ${showText ? "show" : ""}`}>
              {" "}
              Products Management
            </span>
          </a>
        </li>
        <li
          onClick={() => setSelectedContent("CollectionsManagement")}
          className={
            selectedContent === "CollectionsManagement" ? "active" : ""
          }
        >
          <a>
            <LibraryBooksIcon />
            <span className={`text-Admin ${showText ? "show" : ""}`}>
              {" "}
              Collections Management
            </span>
          </a>
        </li>
        <Divider />
        <li
          onClick={() => setSelectedContent("ZodiacManagement")}
          className={selectedContent === "ZodiacManagement" ? "active" : ""}
        >
          <a className="gap-[13px]">
            <img
              className={`zodiac-icon ${isCollapsed ? "collapsed" : ""}`}
              src="/images/zodiac.png"
              alt="Zodiac"
            />
            <span className={`text-Admin ${showText ? "show" : ""}`}>
              {" "}
              Zodiacs Management
            </span>
          </a>
        </li>
        <li
          onClick={() => setSelectedContent("Logout")}
          className={selectedContent === "Logout" ? "active" : ""}
        >
          <a>
            <LogoutIcon />
            <span className={`text-Admin ${showText ? "show" : ""}`}>
              {" "}
              Logout
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  selectedContent: PropTypes.string.isRequired,
  setSelectedContent: PropTypes.func.isRequired,
  setIsSidebarCollapsed: PropTypes.func.isRequired,
};

export default Sidebar;
