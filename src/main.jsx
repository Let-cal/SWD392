import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./components/Customer/Customer.css";
import "./components/Customer/Header/header.css";
import MyComponent from "./components/Customer/MyComponent.jsx";
import "./components/Customer/Zodiac controller/zodiac.css";
import ForgotPassword from "./components/LoginController/forgot-password.jsx";
import Login from "./components/LoginController/login.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<MyComponent />} />
      <Route exact path="/customer-page" element={<MyComponent />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* Các tuyến đường khác nếu cần */}
    </Routes>
  </BrowserRouter>
);
