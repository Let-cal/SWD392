import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AminPage from "./components/Admin/AminPage.jsx";
import "./components/Customer/Customer.css";
import "./components/Customer/Header/header.css";
import MyComponent from "./components/Customer/MyComponent.jsx";
import AccountProfileMain from "./components/Customer/ProfileController/ProfileMain.jsx";
import "./components/Customer/Zodiac controller/zodiac.css";
import DetailProduct from "./components/Customer/detail-product/detail-product.jsx";
import ForgotPassword from "./components/LoginController/forgot-password.jsx";
import Login from "./components/LoginController/login.jsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<AminPage />} />
      <Route exact path="/customer-page" element={<MyComponent />} />
      <Route exact path="/login" element={<Login />} />
      <Route
        exact
        path="/CustomerProfile-order"
        element={<AccountProfileMain />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/DetailProduct" element={<DetailProduct />} />
      {/* Các tuyến đường khác nếu cần */}
    </Routes>
  </BrowserRouter>
);
