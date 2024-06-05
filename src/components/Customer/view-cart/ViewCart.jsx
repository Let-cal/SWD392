import BackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Admin/HeaderOfAdmin";
import "./ViewCart.css";
const CartItem = ({
  imageSrc,
  itemName,
  itemDetails,
  itemPrice,
  itemQty,
  onCheck,
  isChecked,
  onQtyChange,
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
        <div className="item-price">${(itemPrice * itemQty).toFixed(2)}</div>
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
};

function ViewCart() {
  const handleBackClick = () => {
    navigate("/"); // Điều hướng trở lại trang chủ hoặc trang cần thiết
  };
  const [items, setItems] = useState([
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f1bb51e07d3fec2c980222cb5a092812489e1a401e71e4917bb6ba4ecad78638?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&",
      itemName: "Lira Earrings",
      itemDetails: "Black / Medium",
      itemPrice: 30.0,
      itemQty: 1,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/b99eef8e517d6dcfb80b0c0c159f7dd0571dc4bccdc9927600b2e1239f661326?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&",
      itemName: "Ollie Earrings",
      itemDetails: "Gold / Small",
      itemPrice: 20.0,
      itemQty: 1,
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d85854aecfe81a23e7735255b6c1d788e03b9b8f46a9b90997d2ac8856a9856b?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&",
      itemName: "Kaede Hair Pin",
      itemDetails: "Silver/ Large",
      itemPrice: 50.0,
      itemQty: 1,
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [isGetAll, setIsGetAll] = useState(true); // Initially "Get All"
  const navigate = useNavigate();

  const handleCheck = (index) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(index)) {
        // Remove item if already checked
        return prevSelectedItems.filter((item) => item !== index);
      } else {
        // Add item if not checked
        return [...prevSelectedItems, index];
      }
    });
  };

  const handleQtyChange = (itemName, newQty) => {
    if (newQty < 0) return;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.itemName === itemName ? { ...item, itemQty: newQty } : item
      )
    );
  };

  const calculateTotal = () => {
    return selectedItems
      .reduce((total, index) => {
        const item = items[index];
        return total + item.itemPrice * item.itemQty;
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    const selectedProducts = selectedItems.map((index) => items[index]);
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
    calculateTotal();
  }, [items, selectedItems]);

  return (
    <>
      <Header />
      <div className="shopping-cart-container mt-5">
        <div className="flex flex-row justify-between">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={handleBackClick}
          >
            <BackIcon />
          </IconButton>
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
        </div>

        <section className="shopping-cart">
          {items.map((item, index) => (
            <CartItem
              key={index}
              {...item}
              isChecked={selectedItems.includes(index)}
              onCheck={() => handleCheck(index)}
              onQtyChange={handleQtyChange}
            />
          ))}
        </section>
        <div className="checkout-section-fixed">
          <div className="total-amount">
            TOTAL: <span className="amount">${calculateTotal()}</span>
          </div>
          <button
            disabled={selectedItems.length === 0}
            className="checkout-button"
            onClick={handleCheckout}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}

export default ViewCart;
