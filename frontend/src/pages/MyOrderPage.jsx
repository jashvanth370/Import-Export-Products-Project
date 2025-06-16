import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/AuthStore';
import '../styles/MyOrderPage.css';
import { useNavigate } from 'react-router-dom';

const MyOrdersPage = () => {
    const { user } = useAuthStore();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleDelete = async(orderId) => {
        try{
            const response = await fetch(`http://localhost:8080/api/orders/delete/${orderId}`,{
                method: 'DELETE',
            });
            
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete order');
            }

            const data = await response.json();
            console.log('Order deleted successfully:', data);
            alert("Are you sure delete");
            window.location.reload();
        }
        catch(err){
            console.error("Failed to delete",err.message)
        }
    };

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/orders/user/${user.id}`);
                if (!res.ok) throw new Error('Failed to fetch orders');
                const data = await res.json();
                console.log('Fetched orders:', data);
                setOrders(Array.isArray(data.data) ? data.data : []);
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
            {Array.isArray(orders) && orders.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
            ) : (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Qty</th>
                            <th>Order Date</th>
                            <th>Shipping Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id || index}>
                                <td>{order.productId ?? 'N/A'}</td>
                                <td>{order.quantity ?? 'N/A'}</td>
                                <td>
                                    {order.orderDate
                                        ? new Date(order.orderDate).toLocaleDateString()
                                        : 'N/A'}
                                </td>
                                <td>{order.shippingAddress ?? 'N/A'}</td>
                                <td>{order.status ?? 'N/A'}</td>
                                <td>
                                    <button onClick={() => navigate(`/track-shipment/${order.id}`)}>
                                        Track Shipment
                                    </button>
                                    <button onClick={()=> handleDelete(order.id)}>
                                        Cancel
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

export default MyOrdersPage;
