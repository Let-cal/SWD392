import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  const fetchCartItemCount = async () => {
    const userId = localStorage.getItem("hint");
    const token = localStorage.getItem("token");

    if (!token || !userId) {
      console.warn("Token or user ID is missing.");
      return;
    }

    try {
      const response = await axios.get(
        `https://zodiacjewerlyswd.azurewebsites.net/api/orders/customer/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.data && response.data.data.product) {
        setCartItemCount(response.data.data.product.length);
      } else {
        console.warn("Invalid response structure", response.data);
      }
    } catch (error) {
      console.error("There was an error fetching the cart data!", error);
    }
  };

  useEffect(() => {
    fetchCartItemCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartItemCount, fetchCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
