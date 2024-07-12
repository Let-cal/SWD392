import { useState } from "react";
import { useAuth } from "../LoginController/AuthContext.jsx";
import CollectionsManagement from "./CollectionManagement/CollectionsManagement.jsx";
import Header from "./HeaderOfStaff.jsx";
import StaffAccountManagement from "./HomePage/StaffAccountManagement.jsx";
import OrdersManagement from "./OrderManagement/OrderManagement.jsx";
import ProductsManagement from "./ProductManagement/ProductManagement.jsx";
import "./StaffPage.css"; // Add this import for the new CSS styles
import ZodiacManagement from "./ZodiacController/ZodiacManagement.jsx";
import Sidebar from "./sidebar.jsx";
function StaffPage() {
  const { handleLogout } = useAuth();
  const [selectedContent, setSelectedContent] = useState(
    "StaffAccountManagement.jsx"
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
    case "Logout":
      ContentComponent = handleLogout;
      break;
    case "StaffAccountManagement":
      ContentComponent = StaffAccountManagement;
      break;
    default:
      ContentComponent = StaffAccountManagement;
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
          selectedContent={selectedContent}
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

export default StaffPage;
