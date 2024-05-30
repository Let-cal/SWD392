import ReactDOM from "react-dom/client";
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./components/Admin/AminPage.jsx"
import "./components/Customer/Customer.css";
import "./components/Customer/Header/header.css";
import MyComponent from "./components/Customer/MyComponent.jsx";
import "./components/Customer/Zodiac controller/zodiac.css";
import DetailProduct from "./components/Customer/detail-product/detail-product.jsx";
import ForgotPassword from "./components/LoginController/forgot-password.jsx";
import Login from "./components/LoginController/login.jsx";
import "./index.css";
import Sidebar from "./components/Admin/sidebar.jsx";
import ViewCart from "./components/Customer/view-cart/ViewCart.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider maxSnack={3}>
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<MyComponent />} />
      <Route exact path="/customer-page" element={<MyComponent />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/DetailProduct" element={<DetailProduct />} />
      {/* Các tuyến đường khác nếu cần */}
    </Routes>
  </BrowserRouter>
  </SnackbarProvider>
);
