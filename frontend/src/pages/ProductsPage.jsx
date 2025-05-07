import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting
import useAuthStore from '../store/AuthStore';
import '../styles/ProductPage.css'; // Import your CSS file for styling

const ProductsPage = () => {
  const { user } = useAuthStore();  // Get the current logged-in user
  const navigate = useNavigate();   // React Router hook for navigation
  const [products, setProducts] = useState([]);
  const [requested, setRequested] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
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

  const handleRequest = (product) => {
    if (!user) {
      alert('Please log in to request a product.');
      navigate('/login'); // Redirect to login page
      return;
    }

    setRequested((prev) => [...prev, product]);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="products-page">
      <h2>Welcome, {user?.username || 'Guest'} (Importer)</h2>
      <h3>Available Products:</h3>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h4>📦 {product.name}</h4>
            <p>{product.description}</p>
            <p><strong>Qty:</strong> {product.quantity}</p>
            <p><strong>Price:</strong> {product.value}</p>
            <p><strong>Origin Country:</strong> <span className="tag">🌍 {product.originCountry}</span></p> 
            <p><strong>Weight:</strong> {product.weight} kg</p>
            
            <p><span className="tag">👤 Exporter: {product.exporter}</span></p>
            <button onClick={() => handleRequest(product)}>Request Product</button>
          </div>
        ))}
      </div>

      {requested.length > 0 && (
        <>
          <h3>Requested Products:</h3>
          <ul>
            {requested.map((p) => (
              <li key={p.id}>{p.name} from {p.exporter}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
