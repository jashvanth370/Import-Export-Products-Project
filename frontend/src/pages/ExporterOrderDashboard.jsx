import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/AuthStore';
import '../styles/ExporterOrderDashboard.css';

const ExporterOrderDashboard = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/exporter/${user.id}/orders`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  console.log('orders:', orders);

  useEffect(() => {
    if (user && user.role === 'EXPORTER') {
      fetchOrders();
    }
  }, [user]);

  const handleAcceptOrder = async (orderId,action) => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${orderId}/${action}`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error('Failed to confirm order');

      alert('✅ Order confirmed!');
      fetchOrders(); 
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('❌ Could not confirm order');
    }
  };

  return (
    <div className="exporter-orders-dashboard">
      <h2>📦 Exporter Order Dashboard</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h4>Order ID: {order.id}</h4>
              <p><strong>Product ID:</strong> {order.productId}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Importer ID:</strong> {order.importerId}</p>
              <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
              <p><strong>Status:</strong> {order.status}</p>
              {order.status === 'PENDING' && (
                <button onClick={() => handleAcceptOrder(order.id, 'accept')}>Accept Order</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExporterOrderDashboard;
