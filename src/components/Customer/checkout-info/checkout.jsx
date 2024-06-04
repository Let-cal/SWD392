import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './checkout.css';

function Checkout() {
    const location = useLocation();
    const { selectedItems, items } = location.state || {};

    const [orderInfo, setOrderInfo] = useState({
        name: '',
        address: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            if (/^\d*$/.test(value) && (value.length === 0 || (value.length <= 10 && value[0] === '0'))) {
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

    return (
        <div className="checkout-container">
            <div className="checkout-items">
                {selectedItems && selectedItems.map((item, index) => (

                    <div key={index} className="checkout-item ">
                        <div className="item-image">
                            <img src={item.imageSrc} alt={item.itemName} />
                        </div>
                        <div className='flex justify-between flex-row w-full'>
                            <div className="item-name">{item.itemName}</div>

                            <div className="item-details">
                                <div className=" flex-col checkout-item-quantity"> <span className='font-bold'>Quantity</span>
                                    <span>{item.itemQty}</span>
                                </div>

                                <div className="flex-col checkout-item-price"> <span className='font-bold'>Unit price</span>
                                    <span>${item.itemPrice.toFixed(2)}</span>
                                </div>

                                <div className="flex-col checkout-item-total"> <span className='font-bold'>Total</span>
                                    <span>${(item.itemPrice * item.itemQty).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <div className="checkout-summary">
                BILL TOTAL: ${selectedItems.reduce((total, item) => {
                    return total + item.itemPrice * item.itemQty;
                }, 0).toFixed(2)}

            </div>
            <form onSubmit={(e) => e.preventDefault()} className="checkout-form">
                <h2>Delivery Infomation</h2>
                <input type="text" name="name" placeholder="Name" value={orderInfo.name} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone number" value={orderInfo.phone} onChange={handleChange} required />
                <textarea name="address" placeholder="Address" value={orderInfo.address} onChange={handleChange} required></textarea>
                <button type="submit" onClick={handleCheckout}>PLACE TO ORDER</button>
            </form>
        </div>
    );
}

export default Checkout;
