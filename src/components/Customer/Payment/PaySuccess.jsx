import React from 'react';
import './PaySuccess.css';

function PaySuccess() {
  return (
    <div className="success-container">
      <div className="success-content">
        <h1>Payment Successful!</h1>
        <p>Please check your Email. Thank you for your purchase!</p>
        <a className="home-link" href="/customer-page">Back to Home Page</a>
      </div>
    </div>
  );
}

export default PaySuccess;
