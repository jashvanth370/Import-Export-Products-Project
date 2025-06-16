import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import '../styles/ProductsExporter.css';

const ProductsExporter = () => {
  const { user, token } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
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
        console.log(products.imageUrl);
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
      alert('Are you sure delete this product');
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(prev => prev.filter(p => p.id !== productId));
      alert('Are you sure delete this product');
    } catch (error) {
      console.error(error);
      alert('Failed to delete product');
    }
  };

  const handleUpdateProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setEditingProductId(productId);
      setFormData({
        name: product.name,
        quantity: product.quantity,
        value: product.value,
        originCountry: product.originCountry,
        weight: product.weight,
        hsCode: product.hsCode,
      });
      setShowModal(true);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/products/update/${editingProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          exporterId: user.id,
        }),
      });

      if (!res.ok) throw new Error('Failed to update product');

      setProducts(prev =>
        prev.map(p => (p.id === editingProductId ? { ...p, ...formData } : p))
      );

      setShowModal(false);
      setEditingProductId(null);
      setFormData({ name: '', quantity: '', value: '', originCountry: '', weight: '', hsCode: '' });
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

      <button onClick={() => navigate('/products/add')}>➕ Add New Product</button>

      <h3>My Products</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            {product.imageUrl ? (
              <img
                src={`http://localhost:8080/api/products/${product.id}/image`}
                alt={product.name}
                className="product-image"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            ) : (
              <div className="no-image-placeholder" style={{ width: '150px', height: '150px', background: '#ddd' }}>
                No Image
              </div>
            )}
            <h4>{product.name}</h4>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Price:</strong> ${product.value}</p>
            <p><strong>Origin:</strong> {product.originCountry}</p>
            <p><strong>Weight:</strong> {product.weight} kg</p>
            <p><strong>HS Code:</strong> {product.hsCode}</p>
            


            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete Product
            </button>
            <p></p>
            <button onClick={() => handleUpdateProduct(product.id)}>
              Update Product
            </button>

          </div>
        ))}
      </div>

      {/* Update Modal */}
      {showModal && (
        <div className="modal">
          <form className="modal-form" onSubmit={handleSubmitUpdate}>
            <h3>Update Product</h3>
            <input type="text" placeholder="Name" value={formData.name}
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <input type="number" placeholder="Quantity" value={formData.quantity}
                   onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} required />
            <input type="number" placeholder="Value ($)" value={formData.value}
                   onChange={(e) => setFormData({ ...formData, value: e.target.value })} required />
            <input type="text" placeholder="Origin Country" value={formData.originCountry}
                   onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })} required />
            <input type="number" placeholder="Weight (kg)" value={formData.weight}
                   onChange={(e) => setFormData({ ...formData, weight: e.target.value })} required />
            <input type="text" placeholder="HS Code" value={formData.hsCode}
                   onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })} required />
            <div className="modal-buttons">
              <button type="submit">Update</button>
              <button type="button" onClick={() => {
                setShowModal(false);
                setEditingProductId(null);
              }}>Cancel</button>
            </div>
          </form>
        </div>
      )}


    </div>
  );
};

export default ProductsExporter;
