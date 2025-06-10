import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">GenSlides</span>
      </div>
      <div className="navbar-right">
        <Link to="/home" className={isActive('/home') ? 'active' : ''}>Home</Link>
        <Link to="/home#about" className={location.hash === '#about' ? 'active' : ''}>About</Link>

        <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact Us</Link>
        <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
