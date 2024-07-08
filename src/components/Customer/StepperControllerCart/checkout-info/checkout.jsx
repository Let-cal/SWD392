import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../../Admin/HeaderOfAdmin";
import CheckoutStepper from "../StepperComponent";
import "./checkout.css";

function Checkout() {
  const location = useLocation();
  const { selectedItems } = location.state || [];

  useEffect(() => {
    const handleResize = () => {
      const checkoutItems = document.querySelectorAll(".checkout-item");
      checkoutItems.forEach(item => {
        const itemImage = item.querySelector(".item-image img");
        const itemInfo = item.querySelector(".item-info");
        if (itemImage && itemInfo) {
          itemImage.style.height = `${itemInfo.offsetHeight}px`;
        }
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedItems]);

  const [orderInfo, setOrderInfo] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (/^\d*$/.test(value) && (value.length === 0 || (value.length <= 10 && value[0] === "0"))) {
        setOrderInfo({ ...orderInfo, [name]: value });
      }
    } else {
      setOrderInfo({ ...orderInfo, [name]: value });
    }
  };

  const handleCheckout = () => {
    console.log("Order Info:", orderInfo);
    // Thực hiện logic thanh toán tại đây
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
                      <span>Quantity</span>{" "}
                      <span>{item.itemQty}</span>
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
            BILL TOTAL: {formatPrice(
              selectedItems.reduce((total, item) => total + item.itemPrice * item.itemQty, 0)
            )}đ
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
