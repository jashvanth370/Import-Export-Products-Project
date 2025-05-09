import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/TransactionPage.css'; // Import the CSS file

const TransactionPage = () => {
  const location = useLocation();
  const { product, quantity, days } = location.state || {};

  if (!product) {
    return <p>No transaction data found.</p>;
  }

  const totalPrice = product.value * quantity;

  return (
    <div className="transaction-page">
      <h2>Transaction Details</h2>
      <div className="details">
        <p><strong>Product:</strong> {product.name}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Delivery in:</strong> {days} days</p>
        <p><strong>Exporter:</strong> {product.exporter}</p>
        <p className="total-price"><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
      </div>

      {/* Include payment or confirmation logic here */}
      <div className="button-group">
        <button onClick={() => alert('Proceeding to payment...')}>Proceed to Payment</button>
        <button onClick={() => alert('Canceling transaction...')}>Cancel</button>
      </div>
    </div>
  );
};

export default TransactionPage;
