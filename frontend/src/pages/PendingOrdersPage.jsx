import React, { useEffect, useState } from 'react';
import '../styles/PendingOrdersPage.css';
import useAuthStore from '../store/AuthStore';
import useOrderStore from '../store/OrderStore';

const PendingOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuthStore();
  const { refreshPendingCount } = useOrderStore();

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:8080/api/orders/pending/exporter/${user.id}`)
      .then(res => res.json())
      .then(data => setOrders(data.data || []))
      .catch(err => console.error(err));
  }, [user]);


  const handleAction = async (orderId, action) => {
    try {
      const res = await fetch(`http://localhost:8080/api/orders/${orderId}/${action}`, {
        method: 'PUT'
      });
      if (!res.ok) throw new Error('Failed to update order status');

      // Update UI
      setOrders(prev => prev.filter(o => o.id !== orderId));

      // Refresh global pending count
      if (user?.id) refreshPendingCount(user.id);

      alert(`✅ Order ${action}ed!`);
    } catch (err) {
      console.error(err);
      alert('Error processing order');
    }
  };


  return (
    <div className="pending-orders-container">
      <h2 className="fade-in">📥 Pending Orders</h2>
      {orders.length === 0 ? (
        <p className="fade-in">No pending orders.</p>
      ) : (
        <table className="orders-table fade-in">
          <thead>
            <tr>
              <th>Importer ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Shipping Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.importerId}</td>
                <td>{order.productId}</td>
                <td>{order.quantity}</td>
                <td>{order.shippingAddress}</td>
                <td>
                  <button className="btn accept" onClick={() => handleAction(order.id, 'accept')}>
                    Accept
                  </button>
                  <button className="btn reject" onClick={() => handleAction(order.id, 'reject')}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingOrdersPage;
