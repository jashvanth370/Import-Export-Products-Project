import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductForm.css';
import useAuthStore from '../store/AuthStore';

const ProductForm = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    hsCode: '',
    originCountry: '',
    weight: '',
    value: '',
    status: '',
    quantity: '',
  });
  const [error, setError] = useState('');

  if (!user || user.role !== 'EXPORTER') {
    navigate('/');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error('Failed to add product');

      alert('Product added successfully!');
      navigate('/products'); // Go back to product list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClose = () => navigate('/products');

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-button" onClick={handleClose}>×</button>
         <div className="product-form-container product-form">
        <h2>Add New Product</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Product Name:
            <input type="text" name="name" value={product.name} onChange={handleInputChange} required />
          </label>
          <label>HS Code:
            <input type="text" name="hsCode" value={product.hsCode} onChange={handleInputChange} />
          </label>
          <label>Origin Country:
            <input type="text" name="originCountry" value={product.originCountry} onChange={handleInputChange} required />
          </label>
          <label>Weight (kg):
            <input type="number" name="weight" value={product.weight} onChange={handleInputChange} required />
          </label>
          <label>Value:
            <input type="number" name="value" value={product.value} onChange={handleInputChange} required />
          </label>
          <label>Status:
            <input type="text" name="status" value={product.status} onChange={handleInputChange} required />
          </label>
          <label>Quantity:
            <input type="number" name="quantity" value={product.quantity} onChange={handleInputChange} required />
          </label>
          <button type="submit">Add Product</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
