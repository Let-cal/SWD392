import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AminPage from "./components/Admin/AminPage.jsx";
import AboutPage from "./components/Customer/AboutController/AboutPage.jsx";
import "./components/Customer/Customer.css";
import "./components/Customer/Header/header.css";
import MyComponent from "./components/Customer/MyComponent.jsx";
import AccountProfileMain from "./components/Customer/ProfileController/ProfileMain.jsx";
import "./components/Customer/Zodiac controller/zodiac.css";
import DetailProduct from "./components/Customer/detail-product/detail-product.jsx";
import { AuthProvider } from "./components/LoginController/AuthContext.jsx";
import RegisterPage from "./components/LoginController/RegisterController/RegisterPage.jsx";
import ForgotPassword from "./components/LoginController/forgot-password.jsx";
import Login from "./components/LoginController/login.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MyComponent />} />
          <Route exact path="/AdminPage" element={<AminPage />} />
          <Route exact path="/customer-page" element={<MyComponent />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/CustomerProfile-order"
            element={<AccountProfileMain />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Register-page" element={<RegisterPage />} />
          <Route path="/DetailProduct" element={<DetailProduct />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          {/* Các tuyến đường khác nếu cần */}
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  </AuthProvider>
);
