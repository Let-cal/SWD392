import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../../Admin/HeaderOfAdmin";
import CheckoutStepper from "../StepperComponent";
import axios from "axios";
import "./checkout.css";

function Checkout() {
  const location = useLocation();
  const { selectedItems } = location.state || [];

  const [orderInfo, setOrderInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const hint = localStorage.getItem("hint");
      const token = localStorage.getItem("token");
      const url = `https://zodiacjewerlyswd.azurewebsites.net/api/users/${hint}`;

      try {
        if (token && hint) {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const { email, "full-name": name, address, "telephone-number": phone } = response.data.data;

          setOrderInfo({
            ...orderInfo,
            email,
            name,
            address,
            phone,
          });
        } else {
          console.error("No token or hint found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo({ ...orderInfo, [name]: value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const hint = localStorage.getItem("hint");
    const url = `https://zodiacjewerlyswd.azurewebsites.net/api/users`;

    const payload = {
      id: parseInt(hint),
      "full-name": orderInfo.name,
      address: orderInfo.address,
      "telephone-number": orderInfo.phone,
      email: orderInfo.email,
      status: 1, // Giữ nguyên giá trị status
      "role-name": "Customer", // Giữ nguyên giá trị role-name
    };

    try {
      if (token) {
        const response = await axios.put(url, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Profile updated successfully:", response.data);
      } else {
        console.error("No token found in localStorage");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <Header />
      <CheckoutStepper />
      <div className="checkout-container">
        <div className="checkout-items-container">
          {selectedItems &&
            selectedItems.map((item, index) => (
              <div key={index} className="checkout-item">
                <div className="item-image">
                  <img src={item.imageSrc} alt={item.itemName} />
                </div>
                <div className="checkout-item-info">
                  <div className="checkout-item-name">{item.itemName}</div>
                  <div className="checkout-item-details">
                    <div className="checkout-item-quantity">
                      <span>Quantity</span> <span>{item.itemQty}</span>
                    </div>
                    <div className="checkout-item-price">
                      <span>Unit price</span>{" "}
                      <span>{formatPrice(item.itemPrice)}đ</span>
                    </div>
                    <div className="checkout-item-total">
                      <span>Total</span>{" "}
                      <span>{formatPrice(item.itemPrice * item.itemQty)}đ</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div>
          <div className="checkout-summary">
            BILL TOTAL:{" "}
            {formatPrice(
              selectedItems.reduce(
                (total, item) => total + item.itemPrice * item.itemQty,
                0
              )
            )}
            đ
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="checkout-form">
            <h2>Delivery Information</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={orderInfo.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              value={orderInfo.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="address"
              placeholder="Address"
              value={orderInfo.address}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" onClick={handleCheckout}>
              PLACE ORDER
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;
