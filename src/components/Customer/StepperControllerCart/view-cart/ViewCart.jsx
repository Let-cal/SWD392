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
      {/* <Checkbox
        checked={isChecked}
        onChange={onCheck}
        className="item-checkbox"
        color="primary"
      /> */}
      <img src={imageSrc} alt={itemName} className="item-image" />
      <div className="item-info">
        <div className="item-name">{itemName}</div>
        <div className="item-details">{itemDetails}</div>
        <div className="item-price">
          <span className="currency">$</span>
          {formatPrice(itemPrice * itemQty)}

        </div>
      </div>
    </div>
    <div className="item-quantity">
      <div className="quantity-controls">
        <button
          className="quantity-button"
          onClick={() => onQtyChange(itemName, itemQty - 1)}
          disabled={itemQty <= 1}
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
        onClick={onRemove}
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
  const [showNoProductMessage, setShowNoProductMessage] = useState(false);
  const [isGetAll, setIsGetAll] = useState(true);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("hint");
  const token = localStorage.getItem("token");

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

        // Check if there is at least one product in the array
        if (response.data.data.product.length > 0) {
          const orderId = response.data.data.product[0]["order-id"]; // Lấy orderId từ sản phẩm đầu tiên trong mảng
          localStorage.setItem('order-id', orderId.toString()); // Lưu orderId vào localStorage
        } else {
          console.error("Không có sản phẩm trong giỏ hàng:", response.data);
        }
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

  const handleQtyChange = async (itemName, newQty) => {
    if (newQty < 1) return; // Không cho phép giảm số lượng xuống dưới 1

    const itemToUpdate = items.find((item) => item["name-product"] === itemName);
    if (!itemToUpdate) return;

    try {
      await axios.put(
        `https://zodiacjewerlyswd.azurewebsites.net/api/orders/update-quantity`,
        {
          "order-id": itemToUpdate["order-id"],
          "product-id": itemToUpdate["product-id"],
          quantity: newQty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems((prevItems) =>
        prevItems.map((item) =>
          item["name-product"] === itemName ? { ...item, quantity: newQty } : item
        )
      );
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật số lượng!", error);
    }
  };

  const handleRemove = async (item) => {
    const { "order-id": orderId, "product-id": productId } = item;
    console.log(`Removing product with orderId: ${orderId} and productId: ${productId}`);

    try {
      const response = await axios.delete(
        `https://zodiacjewerlyswd.azurewebsites.net/api/orders/remove-product/${orderId}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log("Remove product response:", response.data);

      setItems((prevItems) => {
        const updatedItems = prevItems.filter((i) => i["product-id"] !== productId);
        if (updatedItems.length === 0) {
          setShowNoProductMessage(true); // Show "No product" message if no items left
        }
        return updatedItems;
      });
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request data:", error.request);
      } else {
        console.error("General error message:", error.message);
      }
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  

  const handleCheckout = () => {
    const selectedProducts = items.map((item) => ({
      itemName: item["name-product"],
      itemDetails: `${item["name-category"]} / ${item["name-material"]}`,
      itemPrice: item.price,
      itemQty: item.quantity,
      imageSrc: item["image-url"],
    }));
    navigate("/checkout", { state: { selectedItems: selectedProducts, orderId } });
  };

  const handleGetAll = () => {
    if (isGetAll) {
      const allIndices = items.map((_, index) => index);
      setSelectedItems(allIndices);
    } else {
      setSelectedItems([]);
    }
    setIsGetAll(!isGetAll);
  };

  useEffect(() => {
    if (selectedItems.length !== items.length) {
      setIsGetAll(true);
    } else {
      setIsGetAll(false);
    }
  }, [selectedItems, items]);

  useEffect(() => {
    setShowNoProductMessage(items.length === 0); // Show "No product" message if items array is empty
  }, [items]);

  return (
    <>
      <div className="shopping-cart-container mt-5">
        <section className="shopping-cart">
          {showNoProductMessage ? (
            <div className="no-product-message">No products have been added to cart.</div>
          ) : (
            items.map((item, index) => (
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
                onRemove={() => handleRemove(item)}
              />
            ))
          )}
        </section>
        <div className="checkout-section-fixed">
          <div className="total-amount">
            TOTAL:<span className="currency">$</span>
            <span className="amount">{formatPrice(calculateTotal())}</span>

          </div>
          <div className="flex gap-4">
            {/* <Button
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
            </Button> */}
            <Button
              // disabled={selectedItems.length === 0}
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
