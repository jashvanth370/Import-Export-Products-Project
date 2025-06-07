import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import '../styles/ProductForm.css';

const ProductForm = () => {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();

  const [productId, setProductId] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [products, setProducts] = useState([]);
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

  // Redirect if user is not EXPORTER
  useEffect(() => {
    if (!user || user.role !== 'EXPORTER') {
      navigate('/');
    }
  }, [user, navigate]);

  // Handle product form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (showImageUpload && !productId) {
      setShowImageUpload(false); // fallback, no productId no image modal
    }
  }, [showImageUpload, productId]);


  // Submit product data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/products/add', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...product,
          exporterId: user.id
        })
      });

      if (!response.ok) throw new Error('Failed to add product');

      const newProduct = await response.json();
      setProducts(prev => [...prev, newProduct]);

      
      const createdProduct = newProduct.data.id;

      console.log(createdProduct)
      if (createdProduct.id) throw new Error('Missing product ID from response');

      setProductId(createdProduct);
      setShowImageUpload(true);
      alert('Product added! Please upload an image.');
    } catch (err) {
      setError(err.message);
    }
  };

  // Upload image file for the created product
  const handleImageUpload = async (e) => {
    e.preventDefault();
    setError('');

    if (!imageFile) {
      setError('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch(`http://localhost:8080/api/products/${productId}/image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Image upload failed');

      alert('Image uploaded successfully!');
      navigate('/product-exporter');  // Go back to products list after upload
    } catch (err) {
      setError(err.message);
    }
  };

  // Close modal and go back to product list
  const handleClose = () => {
    navigate('/product-exporter');
  };

  return (
    <>
      {/* Product Form Modal */}
      {!showImageUpload && (
        <div className="modal-backdrop">
          <div className="modal">
            <button className="close-button" onClick={handleClose}>×</button>
            <div className="product-form-container product-form">
              <h2>Add New Product</h2>
              {error && <p className="error">{error}</p>}
              <form onSubmit={handleSubmit}>
                <label>
                  Product Name:
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  HS Code:
                  <input
                    type="text"
                    name="hsCode"
                    value={product.hsCode}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Origin Country:
                  <input
                    type="text"
                    name="originCountry"
                    value={product.originCountry}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Weight (kg):
                  <input
                    type="number"
                    name="weight"
                    value={product.weight}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Value:
                  <input
                    type="number"
                    name="value"
                    value={product.value}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Status:
                  <input
                    type="text"
                    name="status"
                    value={product.status}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <div>
                  <button type="submit">Add Product</button>
                  <button onClick={handleClose}>cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="modal-backdrop">
          <div className="modal">
            <button className="close-button" onClick={handleClose}>×</button>
            <div className="product-form-container image-upload-form">
              <h2>Upload Product Image</h2>
              {error && <p className="error">{error}</p>}
              <form onSubmit={handleImageUpload}>
                <label>
                  Select Image:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                  />
                </label>
                <button type="submit">Upload Image</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductForm;
