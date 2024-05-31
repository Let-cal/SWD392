import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Admin/HeaderOfAdmin';
import './ViewCart.css';

const CartItem = ({ imageSrc, itemName, itemDetails, itemPrice, itemQty, onCheck, isChecked, onQtyChange }) => (
    <div className="cart-item">
        <div className="item-details">
            <input type="checkbox" checked={isChecked} onChange={onCheck} className="item-checkbox" />
            <img src={imageSrc} alt={itemName} className="item-image" />
            <div className="item-info">
                <div className="item-name">{itemName}</div>
                <div className="item-details">{itemDetails}</div>
                <div className="item-price">${(itemPrice * itemQty).toFixed(2)}</div>
            </div>
        </div>
        <div className="item-quantity">
            <div className="quantity-controls">
                <button className="quantity-button" onClick={() => onQtyChange(itemName, itemQty - 1)}>-</button>
                <div className="quantity-value">{itemQty}</div>
                <button className="quantity-button" onClick={() => onQtyChange(itemName, itemQty + 1)}>+</button>
            </div>
        </div>
    </div>
);

function ViewCart() {
    const [items, setItems] = useState([
        {
            imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f1bb51e07d3fec2c980222cb5a092812489e1a401e71e4917bb6ba4ecad78638?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&",
            itemName: "Lira Earrings",
            itemDetails: "Black / Medium",
            itemPrice: 30.00,
            itemQty: 1,
        },
        {
            imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b99eef8e517d6dcfb80b0c0c159f7dd0571dc4bccdc9927600b2e1239f661326?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&",
            itemName: "Ollie Earrings",
            itemDetails: "Gold / Small",
            itemPrice: 20.00,
            itemQty: 1,
        },
        {
            imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d85854aecfe81a23e7735255b6c1d788e03b9b8f46a9b90997d2ac8856a9856b?apiKey=bf5f3d3b953d4f9f9f93e548457c202f&",
            itemName: "Kaede Hair Pin",
            itemDetails: "Silver/ Large",
            itemPrice: 50.00,
            itemQty: 1,
        },
    ]);

    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();

    const handleCheck = (index) => {
        setSelectedItems((prevSelectedItems) => {
            const newSelectedItems = [...prevSelectedItems];
            if (newSelectedItems.includes(index)) {
                newSelectedItems.splice(newSelectedItems.indexOf(index), 1);
            } else {
                newSelectedItems.push(index);
            }
            return newSelectedItems;
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
        return selectedItems.reduce((total, index) => {
            const item = items[index];
            return total + item.itemPrice * item.itemQty;
        }, 0).toFixed(2);
    };

    const handleCheckout = () => {
        const selectedProducts = selectedItems.map(index => items[index]);
        navigate('/checkout', { state: { selectedItems: selectedProducts } });
    };
    

    useEffect(() => {
        calculateTotal();
    }, [items, selectedItems]);

    return (
        <>
            <Header />
            <div className="shopping-cart-container">
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
                    <button disabled={selectedItems.length === 0} className="checkout-button" onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </>
    );
}

export default ViewCart;
