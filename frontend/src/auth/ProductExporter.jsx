import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
// import '../styles/ProductsPage.css'; // optional

const ProductsExporter = () => {
  const { user } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  if (!user || user.role !== 'EXPORTER') {
    navigate('/');
    return null;
  }

  return (
    <div className="products-exporter">
      <h2>Welcome, {user.username} (EXPORTER)</h2>
      <button className="add-product-button" onClick={() => navigate('/product-form')}>
        ➕ Add New Product
      </button>

      <h3>My Products:</h3>
      {error && <p className="error">{error}</p>}
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h4>📦 {product.name}</h4>
            <p><strong>Qty:</strong> {product.quantity}</p>
            <p><strong>Price:</strong> {product.value}</p>
            <p><strong>Origin:</strong> 🌍 {product.originCountry}</p>
            <p><strong>Weight:</strong> {product.weight} kg</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsExporter;
