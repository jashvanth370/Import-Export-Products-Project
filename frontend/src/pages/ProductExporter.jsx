import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import '../styles/ProductsExporter.css';

const ProductsExporter = () => {
  const { user, token } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    value: '',
    originCountry: '',
    weight: '',
    hsCode: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/products/exporter/${user.id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, [user]);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(prev => prev.filter(p => p.id !== productId));
      alert('✅ Product deleted successfully');
    } catch (error) {
      console.error(error);
      alert('❌ Failed to delete product');
    }
  };


  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/products/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          exporterId: user.id
        })
      });

      if (!res.ok) throw new Error('Failed to add product');
      const newProduct = await res.json();
      setProducts(prev => [...prev, newProduct]);
      setShowModal(false);
      setFormData({ name: '', quantity: '', value: '', originCountry: '', weight: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user || user.role !== 'EXPORTER') {
    navigate('/');
    return null;
  }

  return (
    <div className="products-exporter-page">
      <h2>Welcome, {user.name} </h2>

      <button onClick={() => setShowModal(true)}>➕ Add New Product</button>

      <h3>My Products</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Price:</strong> ${product.value}</p>
            <p><strong>Origin:</strong> {product.originCountry}</p>
            <p><strong>Weight:</strong> {product.weight} kg</p>
            <p><strong>HS Code:</strong> {product.hsCode}</p>

            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete Product
            </button>

          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Product</h3>
            <form onSubmit={handleAddProduct}>
              <input type="text" placeholder="Product Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="number" placeholder="Quantity" required value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
              <input type="number" placeholder="Value ($)" required value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} />
              <input type="text" placeholder="Origin Country" required value={formData.originCountry} onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })} />
              <input type="number" placeholder="Weight (kg)" required value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} />
              <input type="text" placeholder="HS Code" required value={formData.hsCode} onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })} />
              <div className="modal-buttons">
                <button type="submit">Add Product</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsExporter;
