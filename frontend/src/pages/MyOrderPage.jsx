import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/AuthStore';
import '../styles/MyOrderPage.css';
import ShipmentTrackingPage from './ShipmentTrackingPage';

const MyOrdersPage = () => {
    const { user } = useAuthStore();
    const [orders, setOrders] = useState([]);
    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/orders/user/${user.id}`);
                if (!res.ok) throw new Error('Failed to fetch orders');
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (!user) return <p>Please log in to view your orders.</p>;
    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="my-orders-page">
            <h2>📦 My Orders</h2>
            {orders.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
            ) : (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Qty</th>
                            <th>Order Date</th>
                            <th>Shipping Address</th>
                            <th>Status</th> {/* Optional if you integrate shipment */}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.productId}</td>
                                <td>{order.quantity}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{order.shippingAddress}</td>
                                <td>{shipment}</td> {/* Replace with actual status if linked to shipment */}
                                <td>
                                    <button onClick={ShipmentTrackingPage}>
                                        Track Shipment
                                    </button>
                                </td>
{/* () => navigate(`/track-shipment/${order.id}`) */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyOrdersPage;
