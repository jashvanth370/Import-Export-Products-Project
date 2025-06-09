import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import '../styles/ProductPage.css';

const ProductsPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shippingAddress, setShippingAddress] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        console.log('Fetched products:', data);
        setProducts(Array.isArray(data.data) ? data.data : []);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleRequestClick = (product) => {
    if (!user) {
      alert('Please log in to request a product.');
      navigate('/login');
      // navigate('/products');
      return;
    }
    if(user.role=='EXPORTER'){
      alert("You are exporter, YOU CANT ORDER ")
      return;
    }
    setSelectedProduct(product);
    setQuantity(1);
    setDays(1);
  };

  const handleProceedOrder = async () => {
    if (!selectedProduct || !user) return;

    const orderData = {
      importerId: user.id,
      productId: selectedProduct.id,
      quantity: quantity,
      shippingAddress: shippingAddress,
      exporterId: selectedProduct.exporterId,
    };

    try {
      const response = await fetch('http://localhost:8080/api/orders/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      

      if (!response.ok) throw new Error('Failed to place order');

      const result = await response.json();
      alert(`✅ Order placed successfully! Order ID: ${result.id}`);
      console.log('Order result:', result);
      console.log('Order data:', orderData);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('❌ Failed to place order. Please try again.');
    }
  };

  return (
    <div className="products-page">
      <h2>
        Welcome, {user?.role === 'IMPORTER' ? 'Importer' : 'User'} {user?.name}
      </h2>
      <h3>Available Products:</h3>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : products.length === 0 ? (
        <p>No products available at the moment.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <h4>📦 {product.name}</h4>
              <p>{product.description}</p>
              <p><strong>Qty:</strong> {product.quantity}</p>
              <p><strong>Price:</strong> ${product.value}</p>
              <p><strong>Origin Country:</strong> 🌍 {product.originCountry}</p>
              <p><strong>Weight:</strong> {product.weight} kg</p>
              <p><strong>Exporter:</strong> 👤 {product.exporterName}</p>
              <button onClick={() => handleRequestClick(product)}>Request Product</button>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Order: {selectedProduct.name}</h3>
            <label>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
              />
            </label>
            <label>
              Needed in (days):
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                min={1}
              />
            </label>
            <label>
              Shipping Address:
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
              />
            </label>
            <div className="form-buttons">
              <button onClick={() => setSelectedProduct(null)}>Cancel</button>
              <button onClick={handleProceedOrder}>Order Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
