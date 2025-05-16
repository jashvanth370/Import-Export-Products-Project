import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ShipmentTrackingPage.css';

const ShipmentTrackingPage = () => {
  const { orderId } = useParams(); // Get orderId from URL parameters
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/orders/${orderId}/shipment`);
        if (!response.ok) throw new Error('Shipment not found');
        const data = await response.json();
        setShipment(data.data); // access the `data` field from your backend response wrapper
        console.log('Fetched shipment:', data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchShipment();
    }
  }, [orderId]);

  console.log('Shipment:', shipment);
  console.log('Error:', error);

  if (loading) return <p>Loading shipment info...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!shipment) return <p>No shipment details available.</p>;

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
