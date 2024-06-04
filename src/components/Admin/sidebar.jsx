import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import "./sidebar.css";
function Sidebar({ setSelectedContent }) {
  return (
    <div>
      <div className="bg-gray-100 shadow-md sidebar-admin">
        <div className="flex justify-center mb-[29px] title-header flex-auto text-4xl leading-10">
          <span className="font-bold bg-gradient-custom-header-title bg-clip-text text-transparent">
            A
          </span>
          <span className="bg-gradient-custom-header-title bg-clip-text text-transparent">
            dmin
          </span>
        </div>
        <Divider />
        <ul className="sidebar-nav">
          <li onClick={() => setSelectedContent("HomePage")}>
            <a>
              <HomeIcon /> Home Page
            </a>
          </li>
          <li onClick={() => setSelectedContent("OrdersManagement")}>
            <a>
              <ManageSearchIcon /> Orders Management
            </a>
          </li>
          <li onClick={() => setSelectedContent("ProductsManagement")}>
            <a>
              <ShoppingBagIcon /> Products Management
            </a>
          </li>
          <li onClick={() => setSelectedContent("CollectionsManagement")}>
            <a>
              <LibraryBooksIcon /> Collections Management
            </a>
          </li>
          <Divider />
          <li onClick={() => setSelectedContent("ZodiacsManagement")}>
            <a className="gap-1">
              <img
                className="w-[13%]"
                src="src/components/Customer/images/zodiac.png"
                alt=""
              />{" "}
              Zodiacs Management
            </a>
          </li>
          <li onClick={() => setSelectedContent("UsersManagement")}>
            <a>
              <ManageAccountsIcon /> Users Management
            </a>
          </li>
          <li onClick={() => setSelectedContent("Logout")}>
            <a>
              <LogoutIcon /> Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
Sidebar.propTypes = {
  setSelectedContent: PropTypes.func.isRequired,
};
export default Sidebar;
