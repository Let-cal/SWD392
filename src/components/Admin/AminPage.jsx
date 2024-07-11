import { useState } from "react";
import UserManagement from "../Admin/UserManagement/UserController.jsx";
import { useAuth } from "../LoginController/AuthContext.jsx";
import CollectionsManagement from "./CollectionManagement/CollectionsManagement.jsx";
import Header from "./HeaderOfAdmin.jsx";
import AdminAccountManagement from "./HomePage/AdminAccountManagement.jsx";
import OrdersManagement from "./OrderManagement/OrderManagement.jsx";
import ProductsManagement from "./ProductManagement/ProductManagement.jsx";
import ZodiacManagement from "./ZodiacController/ZodiacManagement.jsx";
import "./adminpage.css"; // Add this import for the new CSS styles
import Sidebar from "./sidebar.jsx";

function AdminPage() {
  const { handleLogout } = useAuth();
  const [selectedContent, setSelectedContent] = useState(
    "AdminAccountManagement"
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  let ContentComponent;
  switch (selectedContent) {
    case "OrdersManagement":
      ContentComponent = OrdersManagement;
      break;
    case "ProductsManagement":
      ContentComponent = ProductsManagement;
      break;
    case "CollectionsManagement":
      ContentComponent = CollectionsManagement;
      break;
    case "ZodiacManagement":
      ContentComponent = ZodiacManagement;
      break;
    case "UsersManagement":
      ContentComponent = UserManagement;
      break;
    case "AdminAccountManagement":
      ContentComponent = AdminAccountManagement;
      break;
    default:
      ContentComponent = AdminAccountManagement;
      break;
  }

  const handleSidebarSelection = (content) => {
    if (content === "Logout") {
      handleLogout(); // Logout when "Logout" is selected
    } else {
      setSelectedContent(content); // Update selected content for other options
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <div
        className={`sidebar-container ${isSidebarCollapsed ? "collapsed" : ""}`}
      >
        <Sidebar
          selectedContent={selectedContent}
          setSelectedContent={handleSidebarSelection}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
      </div>
      <div
        className={`content-container ${isSidebarCollapsed ? "expanded" : ""}`}
      >
        <Header />
        <div className="p-5">
          <ContentComponent />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
