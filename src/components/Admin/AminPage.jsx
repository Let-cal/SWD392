import { useState } from "react";
import UserManagement from "../Admin/UserManagement/UserController.jsx";
import { useAuth } from "../LoginController/AuthContext.jsx";
import AdminAccountManagement from "./AdminAccountManagement.jsx";
import Header from "./HeaderOfAdmin.jsx";
import OrdersManagement from "./OrderManagement/OrderManagement.jsx";
import ProductsManagement from "./ProductManagement/ProductManagement.jsx";
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
      // ContentComponent = CollectionsManagement;
      break;
    case "ZodiacsManagement":
      // ContentComponent = ZodiacsManagement;
      break;
    case "UsersManagement":
      ContentComponent = UserManagement;
      break;
    case "Logout":
      ContentComponent = handleLogout;
      break;
    case "AdminAccountManagement":
      ContentComponent = AdminAccountManagement;
      break;
    default:
      ContentComponent = AdminAccountManagement;
      break;
  }

  return (
    <div className="flex flex-row justify-between">
      <div
        className={`sidebar-container ${isSidebarCollapsed ? "collapsed" : ""}`}
      >
        <Sidebar
          setSelectedContent={setSelectedContent}
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
