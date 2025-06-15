import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaBars, FaTimes, FaHome, FaBoxOpen, FaWeightHanging, FaThinkPeaks,
  FaUserCircle} from 'react-icons/fa';

import {FaBoltLightning, FaPerson, FaPersonBooth, FaPersonHiking} from 'react-icons/fa6'
import '../styles/Navbar.css';
import useAuthStore from '../store/AuthStore';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  // New state for pending orders count
  const [pendingCount, setPendingCount] = useState(0);

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    alert("Are you sure to logout");
    logout();
    navigate('/');
  };

  // Fetch pending orders count if user is exporter
  useEffect(() => {
    if (!user?.id || user.role !== 'EXPORTER') {
      setPendingCount(0);
      return;
    }

    const fetchPendingOrders = () => {
      fetch(`http://localhost:8080/api/orders/pending/exporter/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setPendingCount(data.data?.length || 0);
        })
        .catch(err => {
          console.error('Failed to fetch pending orders count', err);
          setPendingCount(0);
        });
    };

    fetchPendingOrders();

    // Optional: poll every 30 seconds for updates
    const interval = setInterval(fetchPendingOrders, 30000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <nav className="navbar">
      <a href="/"><div className="navbar-logo">🌐 TradeBridge</div></a>
      
      <div className="hamburger" onClick={toggleMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><NavLink to="/" exact="true" onClick={closeMenu}></NavLink></li>
        {!user && <li><NavLink to="/login" onClick={closeMenu}><FaPersonHiking /> Login</NavLink></li>}

        {!user && (
          <>
            <li><NavLink to="/users" onClick={closeMenu}><FaPersonBooth /> Register</NavLink></li>
          </>
        )}

        {user?.role === 'IMPORTER' && (
          <>
            <li><NavLink to="/products" onClick={closeMenu}><FaBoxOpen /> Products</NavLink></li>
            <li><NavLink to="/my-orders" onClick={closeMenu}><FaBoxOpen /> My Orders</NavLink></li>
            <li><NavLink to="/user-profile:id" ><FaUserCircle /> profile </NavLink> </li>
            <li><button onClick={() => { closeMenu(); handleLogout(); }} className="logout-button"><FaPerson /> Logout</button></li>
          </>
        )}

        {user?.role === 'ADMIN' && (
          <>
            <li><NavLink to="/admin" onClick={closeMenu} className="text-blue-600 underline"><FaPerson /> Admin Dashboard</NavLink></li>
            <li><button onClick={() => { closeMenu(); handleLogout(); }} className="logout-button"><FaPerson /> Logout</button></li>
          </>
        )}

        {user?.role === 'EXPORTER' && (
          <>
            <li><NavLink to="/product-exporter" onClick={closeMenu} className="text-blue-600 underline"><FaWeightHanging /> My Products</NavLink></li>
            <li>
              <NavLink to="/exporter/pending-orders" onClick={closeMenu} className="pending-orders-link">
                <FaBoltLightning /> Pending Orders
                {pendingCount > 0 && (
                  <span className="notification-badge">{pendingCount}</span>
                )}
              </NavLink>
            </li>
            <li><NavLink to="/exporter-dashboard" onClick={closeMenu}><FaThinkPeaks /> Dashboard</NavLink></li>
            <li><button onClick={() => { closeMenu(); handleLogout(); }} className="logout-button"><FaPerson /> Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
