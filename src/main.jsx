/* eslint-disable react-refresh/only-export-components */
import { SnackbarProvider } from "notistack";
import React, { Suspense, lazy, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./components/Customer/Customer.css";
import "./components/Customer/Header/header.css";
import LoadingBackdrop from "./components/Loading/LoadingBackdrop.jsx"; // Import LoadingBackdrop
import { AuthProvider } from "./components/LoginController/AuthContext.jsx";
import ProtectedRoute from "./components/LoginController/ProtectedRoute.jsx";
import Collection from "./components/Customer/CollectionProduct/Collection.jsx";
import "./index.css";

// Lazy loading components
const AdminPage = lazy(() => import("./components/Admin/AminPage.jsx"));
const AboutPage = lazy(() =>
  import("./components/Customer/AboutController/AboutPage.jsx")
);
const MyComponent = lazy(() => import("./components/Customer/MyComponent.jsx"));
const AccountProfileMain = lazy(() =>
  import("./components/Customer/ProfileController/ProfileMain.jsx")
);
const Checkout = lazy(() =>
  import(
    "./components/Customer/StepperControllerCart/checkout-info/checkout.jsx"
  )
);
const ViewCartDetails = lazy(() =>
  import(
    "./components/Customer/StepperControllerCart/view-cart/ViewCartDetails.jsx"
  )
);
const DetailProduct = lazy(() =>
  import("./components/Customer/detail-product/detail-product.jsx")
);
const OTPVerification = lazy(() =>
  import(
    "./components/LoginController/ForgotPasswordController/PageOTPVerification.jsx"
  )
);
const ChangePasswordPage = lazy(() =>
  import(
    "./components/LoginController/ForgotPasswordController/ResetPassword/ChangePasswordPage.jsx"
  )
);
const ForgotPassword = lazy(() =>
  import(
    "./components/LoginController/ForgotPasswordController/forgot-password.jsx"
  )
);
const RegisterPage = lazy(() =>
  import("./components/LoginController/RegisterController/RegisterPage.jsx")
);
const Login = lazy(() => import("./components/LoginController/login.jsx"));
const StaffPage = lazy(() => import("./components/Staff/StaffPage.jsx"));

const App = () => {
  const [loading, setLoading] = useState(true);

  // Use an effect to simulate a loading delay for demonstration purposes
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2 second loading time
  }, []);

  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Suspense fallback={<LoadingBackdrop open={loading} />}>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <ProtectedRoute
                    element={<MyComponent />}
                    roles={["Customer"]}
                  />
                }
              />
              <Route
                exact
                path="/AdminPage"
                element={
                  <ProtectedRoute element={<AdminPage />} roles={["Admin"]} />
                }
              />
              <Route
                exact
                path="/StaffPage"
                element={
                  <ProtectedRoute element={<StaffPage />} roles={["Staff"]} />
                }
              />
              <Route
                exact
                path="/customer-page"
                element={
                  <ProtectedRoute
                    element={<MyComponent />}
                    roles={["Customer"]}
                  />
                }
              />
              <Route exact path="/login" element={<Login />} />
              <Route
                exact
                path="/ViewCartDetails"
                element={<ViewCartDetails />}
                roles={["Customer"]}
              />
              <Route
                exact
                path="/checkout"
                element={<Checkout />}
                roles={["Customer"]}
              />
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
              <Route path="/DetailProduct/:id" element={<DetailProduct />} />
              <Route path="/AboutPage" element={<AboutPage />} />
              <Route
                path="/OTPVerificationPage"
                element={<OTPVerification />}
              />
              <Route
                path="/ChangePasswordPage"
                element={<ChangePasswordPage />}
              />
              <Route
                path="/Collection"
                element={<Collection />}
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SnackbarProvider>
    </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
