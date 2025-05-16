import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import '../styles/ShipmentTrackingPage.css';

const ShipmentTrackingPage = () => {
  const { orderId } = useParams(); // Get orderId from URL
  const { user } = useAuthStore(); // Authenticated user
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/orders/${orderId}/shipment?userId=${user?.id}`
        );
        if (!response.ok) throw new Error('Shipment not found or unauthorized.');
        const result = await response.json();
        setShipment(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId && user?.id) fetchShipment();
  }, [orderId, user]);

  if (loading) return <p className="status-text">⏳ Loading shipment info...</p>;
  if (error) return <p className="status-text error">❌ {error}</p>;
  if (!shipment) return <p className="status-text">🚫 No shipment details available.</p>;

  return (
    <div className="shipment-tracking-page">
      <h2>🚚 Shipment Tracking</h2>
      <div className="shipment-card">
        <p><strong>📦 Order ID:</strong> {shipment.orderId}</p>
        <p><strong>📍 Status:</strong> {shipment.status}</p>
        <p><strong>📤 Shipped Date:</strong> {shipment.shippedDate}</p>
        <p><strong>📅 Estimated Delivery:</strong> {shipment.shippedDate}</p>
        <p><strong>🔎 Tracking ID:</strong> {shipment.trackingNumber}</p>
      </div>
    </div>
  );
};

export default ShipmentTrackingPage;
