import React, { useEffect, useState } from 'react';

const PendingOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/orders/pending')
      .then(res => res.json())
      .then(data => setOrders(data.data || []))
      .catch(err => console.error(err));
  }, []);

  const handleAction = async (orderId, action) => {
    try {
      const res = await fetch(`http://localhost:8080/api/orders/${orderId}/${action}`, {
        method: 'PUT'
      });
      if (!res.ok) throw new Error('Failed to update order status');
      setOrders(prev => prev.filter(o => o.id !== orderId));
    } catch (err) {
      console.error(err);
      alert('Error processing order');
    }
  };

  return (
    <div className="pending-orders">
      <h2>📥 Pending Orders</h2>
      {orders.length === 0 ? <p>No pending orders.</p> : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <p><strong>Importer:</strong> {order.importerName}</p>
              <p><strong>Product:</strong> {order.productName}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
              <button onClick={() => handleAction(order.id, 'accept')}>✅ Accept</button>
              <button onClick={() => handleAction(order.id, 'reject')}>❌ Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingOrdersPage;
