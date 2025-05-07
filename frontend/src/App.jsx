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
