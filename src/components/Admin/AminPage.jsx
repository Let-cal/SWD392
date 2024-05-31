import AdminAccountManagement from "./AdminAccountManagement.jsx";
import Header from "./HeaderOfAdmin.jsx";
import Sidebar from "./sidebar.jsx";

function AminPage() {
  return (
    <div className="flex flex-row  justify-between">
      <div className="w-1/5">
        <Sidebar />
      </div>

      <div className="w-4/5">
        <Header />
        <AdminAccountManagement />
      </div>
    </div>

  );
}

export default AminPage;
