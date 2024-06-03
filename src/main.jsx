import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./components/Admin/AminPage.jsx";
import AboutPage from "./components/Customer/AboutController/AboutPage.jsx";
import "./components/Customer/Customer.css";
import MyComponent from "./components/Customer/MyComponent.jsx";
import AccountProfileMain from "./components/Customer/ProfileController/ProfileMain.jsx";
import Checkout from "./components/Customer/checkout-info/checkout.jsx";
import DetailProduct from "./components/Customer/detail-product/detail-product.jsx";
import ViewCart from "./components/Customer/view-cart/ViewCart.jsx";
import { AuthProvider } from "./components/LoginController/AuthContext.jsx";
import OTPVerification from "./components/LoginController/ForgotPasswordController/PageOTPVerification.jsx";
import ChangePasswordPage from "./components/LoginController/ForgotPasswordController/ResetPassword/ChangePasswordPage.jsx";
import ForgotPassword from "./components/LoginController/ForgotPasswordController/forgot-password.jsx";
import ProtectedRoute from "./components/LoginController/ProtectedRoute.jsx";
import RegisterPage from "./components/LoginController/RegisterController/RegisterPage.jsx";
import Login from "./components/LoginController/login.jsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MyComponent />} />
          <Route
            exact
            path="/AdminPage"
            element={
              <ProtectedRoute element={<AdminPage />} roles={["Admin"]} />
            }
          />
          <Route
            exact
            path="/customer-page"
            element={
              <ProtectedRoute element={<MyComponent />} roles={["Customer"]} />
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/viewcart" element={<ViewCart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route
            exact
            path="/CustomerProfile-order"
            element={
              <ProtectedRoute
                element={<AccountProfileMain />}
                roles={["Customer"]}
              />
            }
          />
          <Route path="/Forgot-PasswordPage" element={<ForgotPassword />} />
          <Route path="/Register-page" element={<RegisterPage />} />
          <Route path="/DetailProduct" element={<DetailProduct />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/OTPVerificationPage" element={<OTPVerification />} />
          <Route path="/ChangePasswordPage" element={<ChangePasswordPage />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  </AuthProvider>
);
