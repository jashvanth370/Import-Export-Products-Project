import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaBoxOpen, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import '../styles/Navbar.css';
import { FaPerson, FaPersonBooth } from 'react-icons/fa6';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">TradeBridge</div>
      <div className="hamburger" onClick={toggleMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><NavLink to="/" exact="true" onClick={closeMenu}><FaHome /> Home</NavLink></li>
        <li><NavLink to="/users" onClick={closeMenu}><FaPersonBooth /> Register</NavLink></li>
        <li><NavLink to="/products" onClick={closeMenu}><FaBoxOpen /> Products</NavLink></li>
        <li><NavLink to="/about" onClick={closeMenu}><FaInfoCircle /> About</NavLink></li>

        <li><NavLink to="/admin" onClick={closeMenu} 
        className="text-blue-600 underline"> <FaPerson /> Admin Dashboard</NavLink> </li>
        <li><NavLink to="/quote" onClick={closeMenu}><FaFileAlt /> Get a Quote</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
