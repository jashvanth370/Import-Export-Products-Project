import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/contact';
import UserForm from './auth/UserForm';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import TransactionPage from './pages/TransactionPage';
import Addproducts from './auth/AddProducts'
import ProductsExporter from './auth/ProductExporter';
import MyOrdersPage from './pages/MyOrderPage';
import ShipmentTrackingPage from './pages/ShipmentTrackingPage';

function App() {
  return (
    <Router>
      <Navbar />
      
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<ProductsPage />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/quote" element={<h1>Get a Quote</h1>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="transaction" element={<TransactionPage />} />
          <Route path="/product-exporter" element={<ProductsExporter />} />
          <Route path="product-form" element={<Addproducts />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/track-shipment/:orderId" element={<ShipmentTrackingPage />} />


          <Route path="/users" element={<UserForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          
        </Routes>
      </div>
      <Footer />
    </Router>
    
  );
}

export default App;
