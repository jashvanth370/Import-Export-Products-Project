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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
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
      return;
    }
    setSelectedProduct(product);
    setQuantity(1);
    setDays(1);
  };

  const handleProceedTransaction = () => {
    const requestData = {
      product: selectedProduct,
      quantity,
      days
    };
    navigate('/transaction', { state: requestData });
  };

  return (
    <div className="products-page">
      <h2>Welcome, {user?.role === 'IMPORTER'}  {user.name}</h2>
      <h3>Available Products:</h3>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h4>📦 {product.name}</h4>
            <p>{product.description}</p>
            <p><strong>Qty:</strong> {product.quantity}</p>
            <p><strong>Price:</strong> {product.value}</p>
            <p><strong>Origin Country:</strong> 🌍 {product.originCountry}</p>
            <p><strong>Weight:</strong> {product.weight} kg</p>
            <p><strong>Exporter:</strong> 👤 {product.exporter}</p>
            <button onClick={() => handleRequestClick(product)}>Request Product</button>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Request: {selectedProduct.name}</h3>
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
            <div className="form-buttons">
              <button onClick={() => setSelectedProduct(null)}>Cancel</button>
              <button onClick={handleProceedTransaction}>Proceed to Transaction</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
