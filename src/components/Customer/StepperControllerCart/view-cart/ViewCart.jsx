import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewCart.css";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CartItem = ({
  imageSrc,
  itemName,
  itemDetails,
  itemPrice,
  itemQty,
  onCheck,
  isChecked,
  onQtyChange,
  onRemove,
}) => (
  <div className="cart-item">
    <div className="item-details">
      <Checkbox
        checked={isChecked}
        onChange={onCheck}
        className="item-checkbox"
        color="primary"
      />
      <img src={imageSrc} alt={itemName} className="item-image" />
      <div className="item-info">
        <div className="item-name">{itemName}</div>
        <div className="item-details">{itemDetails}</div>
        <div className="item-price">
          {formatPrice(itemPrice * itemQty)}<span className="currency">đ</span>
        </div>
      </div>
    </div>
    <div className="item-quantity">
      <div className="quantity-controls">
        <button
          className="quantity-button"
          onClick={() => onQtyChange(itemName, itemQty - 1)}
        >
          -
        </button>
        <div className="quantity-value">{itemQty}</div>
        <button
          className="quantity-button"
          onClick={() => onQtyChange(itemName, itemQty + 1)}
        >
          +
        </button>
      </div>
      <Button
        onClick={() => onRemove(itemName)}
        startIcon={<ClearIcon />}
        sx={{
          color: "black",
          "&:hover": {
            color: "gray",
            scale: "1.2",
          },
        }}
      ></Button>
    </div>
  </div>
);

CartItem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemDetails: PropTypes.string.isRequired,
  itemPrice: PropTypes.number.isRequired,
  itemQty: PropTypes.number.isRequired,
  onCheck: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onQtyChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

function ViewCart() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isGetAll, setIsGetAll] = useState(true); // Initially "Get All"
  const navigate = useNavigate();
  const userId = localStorage.getItem("hint"); // Lấy userId từ localStorage
  const token = localStorage.getItem("token"); // Lấy token từ localStorage

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `https://zodiacjewerlyswd.azurewebsites.net/api/orders/customer/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.success && Array.isArray(response.data.data.product)) {
        setItems(response.data.data.product);
      } else {
        console.error("Dữ liệu giỏ hàng không hợp lệ hoặc thiếu các thuộc tính cần thiết:", response.data);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu giỏ hàng!", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleCheck = (index) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(index)
        ? prevSelectedItems.filter((item) => item !== index)
        : [...prevSelectedItems, index];

      if (newSelectedItems.length !== items.length) {
        setIsGetAll(true);
      } else {
        setIsGetAll(false);
      }

      return newSelectedItems;
    });
  };

  const handleQtyChange = (itemName, newQty) => {
    if (newQty < 0) return;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item["name-product"] === itemName ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemove = (itemName) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item["name-product"] !== itemName)
    );
  };

  const calculateTotal = () => {
    return formatPrice(selectedItems.reduce((total, index) => {
      const item = items[index];
      return total + item.price * item.quantity;
    }, 0));
  };

  const handleCheckout = () => {
    const selectedProducts = selectedItems.map((index) => {
      const item = items[index];
      return {
        itemName: item["name-product"],
        itemDetails: `${item["name-category"]} / ${item["name-material"]}`,
        itemPrice: item.price,
        itemQty: item.quantity,
        imageSrc: item["image-url"],
      };
    });
    navigate("/checkout", { state: { selectedItems: selectedProducts } });
  };

  const handleGetAll = () => {
    if (isGetAll) {
      const allIndices = items.map((_, index) => index);
      setSelectedItems(allIndices);
    } else {
      setSelectedItems([]); // Clear all selected items
    }
    setIsGetAll(!isGetAll); // Toggle between "Get All" and "Cancel"
  };

  useEffect(() => {
    if (selectedItems.length !== items.length) {
      setIsGetAll(true);
    } else {
      setIsGetAll(false);
    }
  }, [selectedItems, items]);

  return (
    <>
      <div className="shopping-cart-container mt-5">
        <section className="shopping-cart">
          {Array.isArray(items) && items.map((item, index) => (
            <CartItem
              key={index}
              imageSrc={item["image-url"]}
              itemName={item["name-product"]}
              itemDetails={`${item["name-category"]} / ${item["name-material"]}`}
              itemPrice={item.price}
              itemQty={item.quantity}
              isChecked={selectedItems.includes(index)}
              onCheck={() => handleCheck(index)}
              onQtyChange={handleQtyChange}
              onRemove={handleRemove}
            />
          ))}
        </section>
        <div className="checkout-section-fixed">
          <div className="total-amount">
            TOTAL: <span className="amount">{calculateTotal()}<span className="currency">đ</span></span>
          </div>
          <div className="flex gap-4">
            <Button
              variant="contained"
              color="secondary"
              startIcon={isGetAll ? <CheckCircleOutlineIcon /> : <CancelIcon />}
              onClick={handleGetAll}
              style={{
                color: "white",
                backgroundColor: isGetAll ? "black" : "red",
                "&:hover": { backgroundColor: isGetAll ? "gray" : "darkred" },
              }}
            >
              {isGetAll ? "Get All" : "Cancel"}
            </Button>
            <Button
              disabled={selectedItems.length === 0}
              className="checkout-button"
              onClick={handleCheckout}
              style={{
                color: "white",
                backgroundColor: "black",
                "&:hover": { backgroundColor: "gray" },
              }}
            >
              PROCEED TO CHECKOUT
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewCart;
