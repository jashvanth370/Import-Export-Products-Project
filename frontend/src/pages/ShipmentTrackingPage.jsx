import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ShipmentTrackingPage.css';
import useAuthStore from '../store/AuthStore';

const ShipmentTrackingPage = () => {
  const { orderId } = useAuthStore();
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/shipment/order/${orderId}`);
        if (!response.ok) throw new Error('Shipment not found');
        const data = await response.json();
        setShipment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [orderId]);

  if (loading) return <p>Loading shipment info...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="shipment-tracking-page">
      <h2>🚚 Shipment Tracking</h2>
      <div className="shipment-card">
        <p><strong>Order ID:</strong> {shipment.orderId}</p>
        <p><strong>Status:</strong> {shipment.status}</p>
        <p><strong>Shipped Date:</strong> {new Date(shipment.shippedDate).toLocaleDateString()}</p>
        <p><strong>Estimated Delivery:</strong> {new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
        <p><strong>Tracking ID:</strong> {shipment.trackingNumber}</p>
      </div>
    </div>
  );
};

export default ShipmentTrackingPage;
