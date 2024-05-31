import { useState } from "react";
import AdminAccountManagement from "./AdminAccountManagement.jsx";

import UserManagement from "../Admin/UserManagement/UserController.jsx";
import Header from "./HeaderOfAdmin.jsx";
import Sidebar from "./sidebar.jsx";

function AdminPage() {
  const [selectedContent, setSelectedContent] = useState(
    "AdminAccountManagement"
  );

  let ContentComponent;
  switch (selectedContent) {
    case "OrdersManagement":
      // ContentComponent = OrdersManagement;
      break;
    case "ProductsManagement":
      // ContentComponent = ProductsManagement;
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
    case "AdminAccountManagement":
      ContentComponent = AdminAccountManagement;
      break;
    default:
      ContentComponent = AdminAccountManagement;
      break;
  }

  return (
    <div className="flex flex-row justify-between">
      <div className="w-1/5">
        <Sidebar setSelectedContent={setSelectedContent} />
      </div>
      <div className="w-4/5">
        <Header />
        <div className="p-5">
          <ContentComponent />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
